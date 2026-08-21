const TRANSITION_DISTANCE_FALLBACK = 180;
/** Name reaches its target scale 1.2× as fast as the logo. */
const NAME_SCALE_RATE = 1.2;

type Geometry = {
  deltaX: number;
  deltaY: number;
  logoTargetScale: number;
  nameTargetScale: number;
  logoStartWidth: number;
};

type TransitionElements = {
  header: HTMLElement;
  headerIdentity: HTMLElement;
  heroIdentity: HTMLElement;
  heroLogo: HTMLElement;
  heroName: HTMLElement;
  headerLogo: HTMLElement;
  headerName: HTMLElement;
};

type Controller = {
  dispose: () => void;
};

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

const lerp = (from: number, to: number, progress: number): number =>
  from + (to - from) * progress;

const rangeProgress = (value: number, start: number, end: number): number => {
  if (start === end) {
    return value >= end ? 1 : 0;
  }

  return clamp01((value - start) / (end - start));
};

const readTransitionDistance = (): number => {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--identity-transition-distance")
    .trim();
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : TRANSITION_DISTANCE_FALLBACK;
};

const prefersReducedMotion = (): boolean =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isDebugEnabled = (): boolean =>
  new URLSearchParams(window.location.search).has("debugIdentityTransition");

const resetHeroTransform = (heroIdentity: HTMLElement): void => {
  heroIdentity.style.setProperty("--identity-x", "0px");
  heroIdentity.style.setProperty("--identity-y", "0px");
  heroIdentity.style.setProperty("--logo-scale", "1");
  heroIdentity.style.setProperty("--name-scale", "1");
  heroIdentity.style.setProperty("--name-nudge-x", "0px");
};

const measureGeometry = (
  elements: TransitionElements,
  transitionDistance: number
): Geometry | null => {
  const { heroIdentity, heroLogo, heroName, headerLogo, headerName } = elements;
  resetHeroTransform(heroIdentity);

  const scrollY = window.scrollY;
  const startLogo = heroLogo.getBoundingClientRect();
  const targetLogo = headerLogo.getBoundingClientRect();
  const startName = heroName.getBoundingClientRect();
  const targetName = headerName.getBoundingClientRect();

  if (startLogo.width < 1 || targetLogo.width < 1 || startName.width < 1 || targetName.width < 1) {
    return null;
  }

  // Anchor translation to the logo (1x pace element) for stable docking.
  const startTopAtOrigin = startLogo.top + scrollY;

  return {
    deltaX: targetLogo.left - startLogo.left,
    deltaY: targetLogo.top - startTopAtOrigin + transitionDistance,
    logoTargetScale: targetLogo.width / startLogo.width,
    nameTargetScale: targetName.width / startName.width,
    logoStartWidth: startLogo.width
  };
};

const applyState = (
  elements: TransitionElements,
  geometry: Geometry,
  transitionDistance: number,
  reducedMotion: boolean
): void => {
  const { heroIdentity, headerIdentity } = elements;
  const scrollY = window.scrollY;

  if (reducedMotion) {
    const atTop = scrollY < 1;
    resetHeroTransform(heroIdentity);
    heroIdentity.style.setProperty("--hero-opacity", "1");
    heroIdentity.classList.remove("is-docked");
    headerIdentity.style.setProperty("--header-identity-opacity", atTop ? "0" : "1");
    return;
  }

  const progress = clamp01(scrollY / transitionDistance);
  const nameProgress = clamp01(progress * NAME_SCALE_RATE);
  const x = lerp(0, geometry.deltaX, progress);
  const y = lerp(0, geometry.deltaY, progress);
  const logoScale = lerp(1, geometry.logoTargetScale, progress);
  const nameScale = lerp(1, geometry.nameTargetScale, nameProgress);
  // Keep the lockup left-justified: pull the name left as the logo's visual width shrinks.
  const nameNudgeX = -geometry.logoStartWidth * (1 - logoScale);
  const heroOpacity = 1 - rangeProgress(progress, 0.82, 1);
  // Fade starts after the lockup has docked, then eases in over the next 10% of scroll.
  const headerOpacity = rangeProgress(scrollY / transitionDistance, 1, 1.1);
  const docked = progress >= 1;

  heroIdentity.style.setProperty("--identity-x", `${x}px`);
  heroIdentity.style.setProperty("--identity-y", `${y}px`);
  heroIdentity.style.setProperty("--logo-scale", String(logoScale));
  heroIdentity.style.setProperty("--name-scale", String(nameScale));
  heroIdentity.style.setProperty("--name-nudge-x", `${nameNudgeX}px`);
  heroIdentity.style.setProperty("--hero-opacity", String(heroOpacity));
  heroIdentity.classList.toggle("is-docked", docked);
  headerIdentity.style.setProperty("--header-identity-opacity", String(headerOpacity));

  if (isDebugEnabled()) {
    heroIdentity.dataset.debugIdentity = [
      `p=${progress.toFixed(3)}`,
      `np=${nameProgress.toFixed(3)}`,
      `x=${x.toFixed(1)}`,
      `y=${y.toFixed(1)}`,
      `ls=${logoScale.toFixed(3)}`,
      `ns=${nameScale.toFixed(3)}`,
      `nx=${nameNudgeX.toFixed(1)}`,
      `sy=${scrollY.toFixed(0)}`
    ].join(" ");
  }
};

const clearAppliedState = (elements: TransitionElements): void => {
  const { heroIdentity, headerIdentity } = elements;
  if (heroIdentity.isConnected) {
    heroIdentity.style.removeProperty("--identity-x");
    heroIdentity.style.removeProperty("--identity-y");
    heroIdentity.style.removeProperty("--logo-scale");
    heroIdentity.style.removeProperty("--name-scale");
    heroIdentity.style.removeProperty("--name-nudge-x");
    heroIdentity.style.removeProperty("--hero-opacity");
    heroIdentity.classList.remove("is-docked");
    delete heroIdentity.dataset.debugIdentity;
  }
  if (headerIdentity.isConnected) {
    headerIdentity.style.removeProperty("--header-identity-opacity");
  }
};

export function initHomepageIdentityTransition(): Controller | null {
  const isHomePath =
    window.location.pathname === "/" || window.location.pathname === "";
  const header = document.querySelector<HTMLElement>("[data-site-header]");
  const heroIdentity = document.querySelector<HTMLElement>("[data-hero-identity]");
  const headerIdentity = document.querySelector<HTMLElement>("[data-header-identity]");
  const heroLogo = heroIdentity?.querySelector<HTMLElement>("[data-identity-logo]") ?? null;
  const heroName = heroIdentity?.querySelector<HTMLElement>("[data-identity-name]") ?? null;
  const headerLogo = headerIdentity?.querySelector<HTMLElement>("[data-identity-logo]") ?? null;
  const headerName = headerIdentity?.querySelector<HTMLElement>("[data-identity-name]") ?? null;
  const onHome = Boolean(
    isHomePath &&
      header &&
      headerIdentity &&
      heroIdentity &&
      heroLogo &&
      heroName &&
      headerLogo &&
      headerName
  );

  // ClientRouter morph may keep the header node and drop server attributes — set explicitly.
  if (onHome && header) {
    header.setAttribute("data-home-transition", "true");
  } else {
    header?.removeAttribute("data-home-transition");
  }

  document.documentElement.classList.toggle("identity-transition-boot", onHome);

  if (
    !onHome ||
    !header ||
    !headerIdentity ||
    !heroIdentity ||
    !heroLogo ||
    !heroName ||
    !headerLogo ||
    !headerName
  ) {
    document.documentElement.classList.remove("identity-transition-enabled");
    return null;
  }

  const elements: TransitionElements = {
    header,
    headerIdentity,
    heroIdentity,
    heroLogo,
    heroName,
    headerLogo,
    headerName
  };
  let transitionDistance = readTransitionDistance();
  let geometry = measureGeometry(elements, transitionDistance);
  let reducedMotion = prefersReducedMotion();
  let ticking = false;
  let resizeTicking = false;

  document.documentElement.classList.add("identity-transition-enabled");

  const update = (): void => {
    if (!geometry) {
      geometry = measureGeometry(elements, transitionDistance);
    }
    if (!geometry) return;
    applyState(elements, geometry, transitionDistance, reducedMotion);
  };

  const remeasure = (): void => {
    transitionDistance = readTransitionDistance();
    reducedMotion = prefersReducedMotion();
    geometry = measureGeometry(elements, transitionDistance);
    update();
  };

  const onScroll = (): void => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  };

  const onResize = (): void => {
    if (resizeTicking) return;
    resizeTicking = true;
    requestAnimationFrame(() => {
      remeasure();
      resizeTicking = false;
    });
  };

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const onMotionChange = (): void => {
    remeasure();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("orientationchange", onResize, { passive: true });
  motionQuery.addEventListener("change", onMotionChange);

  const resizeObserver =
    typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => {
          onResize();
        })
      : null;

  resizeObserver?.observe(heroIdentity);
  resizeObserver?.observe(headerIdentity);

  const start = async (): Promise<void> => {
    remeasure();
    try {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
    } catch {
      // Font loading failures should not block the transition.
    }
    // Extra frames: ClientRouter morph/layout can still be settling on return visits.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!heroIdentity.isConnected || !headerIdentity.isConnected) return;
        remeasure();
      });
    });
  };

  void start();

  return {
    dispose: () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      motionQuery.removeEventListener("change", onMotionChange);
      resizeObserver?.disconnect();
      clearAppliedState(elements);
      document.documentElement.classList.remove("identity-transition-enabled");
      document.documentElement.classList.remove("identity-transition-boot");
    }
  };
}
