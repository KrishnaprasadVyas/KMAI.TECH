# KMAI.TECH — Interaction & Motion Specification
## Desktop-First Creative Experience with Intentional Mobile Degradation

> **Purpose**
>
> This document is the motion and interaction specification for KMAI.TECH and is intended as an implementation brief for Antigravity.
>
> The goal is **not** to maximize the number of animations. The goal is to create a small number of highly memorable, art-directed interactions that make the site feel custom-built, premium, and spatial.
>
> Desktop should feel **insane**.
> Tablet should feel **controlled and impressive**.
> Mobile should feel **clean, fast, and intentional**, with complex interactions simplified or removed.

---

# 01. Core Creative Direction

KMAI should feel like a **premium independent creative technology studio**, not a SaaS product, software dashboard, or AI-generated agency template.

The visual language should combine:

- editorial typography
- large imagery
- spatial movement
- strong negative space
- subtle physicality
- unusual composition
- controlled motion
- real project work
- restrained UI

The site should not communicate quality by adding more components.

It should communicate quality through:

**composition + typography + imagery + movement + restraint**

## Governing principle

> **The default state should be calm. Interaction should reveal complexity.**

Do not animate everything.

Do not make every section move.

Do not make every element fade upward on scroll.

Do not add particles, blobs, generic glow effects, or random 3D simply because the technology allows them.

The user should encounter a handful of memorable moments.

---

# 02. Interaction Hierarchy

## Tier 1 — Signature interactions

These should receive the most polish:

1. Scroll-driven KMAI hero reveal
2. Floating project field
3. Cursor-following project previews
4. Project-to-case-study expansion
5. Large typography-driven transitions

## Tier 2 — Supporting interactions

Use these to make the experience feel physical:

- magnetic buttons
- custom cursor states
- subtle image parallax
- hover image distortion
- velocity-based movement
- text displacement
- section transition choreography
- testimonial transitions

## Tier 3 — Utility motion

Keep these restrained:

- menu open/close
- basic page transition
- button hover
- focus states
- loading states
- error states

---

# 03. Global Motion Principles

## 03.1 Motion should have hierarchy

Not all animations should have equal speed or intensity.

Suggested starting ranges:

### Micro interactions
150–300ms

Use for:
- links
- buttons
- small cursor changes
- hover states

### Component interactions
350–700ms

Use for:
- project hover
- service changes
- image reveals
- navigation interactions

### Major transitions
900–1800ms

Use for:
- hero reveal
- case-study transition
- section transformations

These are starting points, not rigid values. Tune visually.

---

# 04. Global Smooth Scrolling

Use Lenis on desktop where appropriate.

Lenis should create a controlled feeling of physical scrolling without making the page feel delayed.

Requirements:

- synchronize Lenis with GSAP ticker
- preserve native browser scroll behavior where accessibility requires it
- do not fight browser focus
- do not introduce scroll locking except where the interaction genuinely requires it
- avoid nested scrolling regions unless necessary
- disable or reduce custom smooth scrolling on touch devices if it causes degraded behavior

## Mobile

Prefer native scrolling.

- no scroll lag
- no unnecessary interpolation
- preserve touch responsiveness

---

# 05. Signature Interaction 01 — Scroll-Driven KMAI Hero Reveal

## Concept

The hero behaves like a **full-screen portal / curtain**.

At the beginning, the user sees only the hero.

The rest of the site already exists underneath it, but is visually concealed.

The user scrolls to physically reveal the site.

This is NOT a normal hero that simply scrolls away.

The hero remains pinned while scroll progress drives the reveal.

## User perception

The experience should feel like:

> “I am opening the website.”

not:

> “The hero moved up and now I can see the next section.”

## Timeline

### 0%
Only the hero is visible.

### 15–25%
The first hints of the next section become visible.

### 40–60%
The underlying page becomes clearly visible.

### 70–90%
The majority of the next page is exposed.

### 100%
The portal/reveal is complete and normal page scrolling resumes seamlessly.

## Recommended implementation

Use:

- GSAP
- ScrollTrigger
- `pin: true`
- scrubbed scroll progress
- `clip-path`
- CSS transforms
- SVG masking if useful
- layered elements
- optionally FLIP-like continuity

The visual result matters more than the exact technique.

## K geometry integration

The KMAI geometric K should participate in the transition.

Possible behavior:

1. K begins centered / oversized
2. K expands or separates into geometric planes
3. geometric boundaries create openings
4. content beneath begins appearing through those openings
5. K geometry continues moving outward
6. remaining hero layer resolves
7. page is fully revealed

Another valid solution is to turn the K into a giant mask.

Do not add unnecessary effects just to make the K move.

The geometry itself should carry the transition.

## Technical requirements

The reveal must not create:

- visible jump
- duplicate scrolling
- sudden layout shift
- incorrect scroll position
- blank gaps
- broken browser back behavior

The end of the animation must naturally become the beginning of normal document flow.

## Mobile behavior

Do NOT reproduce the complete desktop effect on small screens.

On mobile:

- reduce scrub distance
- simplify the masking
- reduce layered transforms
- optionally use a simpler scale/clip reveal
- avoid heavy SVG masking if it is expensive
- avoid long pinned interactions

Possible mobile sequence:

1. full-screen hero
2. short scroll-driven clip reveal
3. hero resolves
4. native scrolling immediately continues

The concept survives even when the implementation is simplified.

---

# 06. Signature Interaction 02 — Floating Project Field

## Concept

After the hero has fully revealed the website, Selected Work becomes a **floating visual field**.

Projects should not appear as conventional cards.

Instead, project images exist in a loose composition with:

- different scale
- different vertical positions
- subtle depth
- controlled overlap
- large negative space

The field should feel closer to:

> a curated digital moodboard

than:

> a portfolio grid.

## Default state

Each project has:

- image
- project title
- optional category
- stable resting position

Projects should drift only very subtly.

Do not make them continuously bob like decorations.

## Cursor proximity behavior

When the cursor approaches a project:

- project can shift slightly toward cursor
- scale increases
- z-index/depth increases
- nearby projects can move slightly away
- image treatment becomes more vivid
- title can reveal itself
- cursor state changes

Use physical-feeling interpolation rather than a simple CSS scale.

## Physics characteristics

Use:

- spring-like interpolation
- damping
- inertia
- velocity tracking

Avoid:

- elastic cartoon bounce
- excessive rotation
- exaggerated magnetic movement

The movement should feel like a large physical print being moved on a table.

## Desktop layout

Allow projects to:

- sit outside the central column
- overlap whitespace
- cross alignment lines
- appear at different scales

But preserve readability and clear interaction affordances.

## Mobile behavior

Do NOT attempt free-floating physics on a small screen.

Replace it with:

- vertically stacked large project images
- occasional offset alignment
- one project per viewport or partial viewport
- tap to expand

No cursor-following behavior.

---

# 07. Signature Interaction 03 — Cursor-Following Project Preview

## Concept

Use a minimal project index:

```text
SHRI GURUDEV ASHRAM
MAVT
SHANTI ASHRAM
VISHWARAJ
```

Moving over a project title causes a large image preview to appear and follow the cursor.

The page remains visually minimal.

The image provides the visual richness.

## Behavior

On pointer enter:

- preview appears
- image fades/masks in quickly
- slight positional offset is applied
- cursor transitions to a project-specific state

While moving:

- image follows pointer
- use interpolation
- use slight lag
- optionally apply velocity-based rotation or skew

On pointer leave:

- image exits
- cursor returns to normal

## Important rule

The preview should follow the cursor with restraint.

The user should feel:

> “The website is reacting to me.”

not:

> “I am trying to control this animation.”

## Multiple projects

When moving from one title to another:

- previous preview should not simply disappear instantly
- use a quick visual handoff
- previous image can clip out while the next clips in
- maintain a single preview layer rather than creating many expensive DOM nodes

## Mobile

There is no hover.

Use one of:

### Tap-to-preview

Tap a title:

- image expands below it
- supporting information appears
- CTA opens the case study

OR:

### Scroll-reveal

As each project enters the viewport:

- image appears
- title reveals
- supporting content follows

Do not emulate desktop hover on touch devices.

---

# 08. Signature Interaction 04 — Project Hover → Full-Screen Case Study

## Concept

A project should feel like it physically expands into its case study.

The user should feel:

> “I entered this project.”

not:

> “A new page loaded.”

## Desktop sequence

1. User hovers project
2. Project becomes active
3. Project image expands slightly
4. User clicks
5. Current image becomes the transition origin
6. Image grows toward full viewport
7. Title / metadata transitions with it
8. Case-study page resolves

## Shared-element / FLIP approach

Prefer visual continuity.

Preserve:

- position
- scale
- crop relationship
- visual identity

during the transition.

GSAP Flip can be used where appropriate.

## Avoid

- white flash
- loading spinner as the transition
- abrupt route replacement
- hard fade to black

Prefer:

- image expansion
- geometric clipping
- background continuity
- persistent typography where practical

## Mobile

Use a shorter tap-driven transition:

- tap
- short image expansion
- simple route transition

Avoid long cinematic transitions on small screens.

---

# 09. Signature Interaction 05 — Giant Typography Transitions

## Concept

Use typography as a visual object.

Do not make every section start with:

```text
SERVICES
small subtitle
cards
```

Instead use huge words or phrases that physically change.

## Example — Services

Possible composition:

```text
SOFTWARE
```

then:

```text
SOFTWARE
WEB DESIGN
```

then:

```text
SOFTWARE
WEB DESIGN
AUTOMATION
```

then:

```text
SOFTWARE
WEB DESIGN
AUTOMATION
AI SOLUTIONS
```

But do not merely append words.

Typography can:

- slide
- overlap
- scale
- clip
- swap
- move horizontally
- change alignment

## Implementation model

Have:

- one large typographic system
- one active service index
- one supporting content area

Scroll progress controls the active service.

The result is one visual composition instead of four cards.

## Mobile

Keep typography large but reduce choreography.

Use:

- one service per viewport region
- word enters
- supporting content appears
- next service replaces it

---

# 10. Signature Interaction 06 — Services as Spatial States

Each service can control the visual state of the page.

### SOFTWARE
- typography dominant
- technical project imagery
- geometric motion

### WEB DESIGN
- image-forward state
- stronger editorial layout
- larger visual surfaces

### AUTOMATION
- process / flow-inspired motion
- connected movement between elements

### AI SOLUTIONS
- more abstract but restrained visual treatment

All states still use the same KMAI brand.

Do not give each service a completely unrelated color palette.

---

# 11. Signature Interaction 07 — Process as One Continuous Sequence

Stages:

1. DISCOVER
2. ARCHITECT
3. ENGINEER
4. SCALE

## Desktop concept

Pin a major visual area.

As the user scrolls:

### DISCOVER
Initial state.

### ARCHITECT
Composition reorganizes.

### ENGINEER
More detail enters.

### SCALE
Final system becomes complete.

The user should experience a transformation rather than four separate cards.

## Possible central object

The geometric K can act as the central evolving object.

It can:

- split
- reorganize
- multiply
- align
- resolve

Only use this if the geometry remains elegant.

## Mobile

Do not pin a complex object for a long duration.

Use four sequential states with lightweight transforms.

---

# 12. Signature Interaction 08 — Editorial Testimonials

Testimonials should not become review cards.

Use:

- very large quote
- generous whitespace
- client name beneath
- optional company information

## Desktop

One quote can dominate the viewport.

As the user scrolls:

1. quote enters
2. identity appears
3. quote shifts/exits
4. next quote replaces it

Possible motion:

- horizontal travel
- vertical offset
- clipping
- subtle rotation
- masking

## Mobile

Use a simpler stacked sequence.

Do not force overlapping typography where readability suffers.

---

# 13. Signature Interaction 09 — Dark “Event” Section

The site should primarily use warm ivory.

Occasionally transition into a dramatic dark section.

Example:

```text
WE DON'T
BUILD
ORDINARY
THINGS.
```

The transition itself should be part of the experience.

## Desktop

Possible:

- ivory background gradually clips away
- dark section rises beneath
- giant text appears
- blue accent enters subtly

Use the background change as the animation.

Do not use a generic gradient transition.

## Mobile

Keep the contrast.

Simplify the transition.

A direct section background transition is acceptable.

---

# 14. Signature Interaction 10 — Image Distortion

Project imagery can respond subtly to user interaction.

Possible desktop behavior:

- pointer proximity
- image displacement
- mild stretch
- subtle perspective
- velocity distortion

## Technical options

Lightweight:
- CSS transform
- scale
- translate
- skew
- object-position

Advanced:
- canvas
- WebGL
- shader distortion
- R3F

Do not use WebGL everywhere.

Use advanced rendering only for hero/project moments where it materially improves the experience.

## Performance

Do not apply expensive shaders to dozens of elements.

Prefer:

- one active effect
- one active preview
- lazy activation
- GPU-friendly transforms

## Mobile

Disable advanced distortion on touch.

Use simple scale / position / crop changes.

---

# 15. Signature Interaction 11 — Magnetic Buttons

Retain existing magnetic button infrastructure where appropriate.

Magnetism should be subtle.

On pointer proximity:

- button moves slightly toward pointer
- label follows
- cursor responds

Do not let buttons travel across the screen.

## Mobile

Disable magnetic behavior.

Use normal tap interaction.

---

# 16. Signature Interaction 12 — Custom Cursor System

Use cursor states to communicate interaction.

Possible states:

### Default
Small dot / minimal cursor.

### Project
`VIEW`

### Open
`OPEN`

### Drag
`DRAG`

### External destination
`↗`

The cursor should stay small enough not to distract from content.

## Mobile

No custom cursor.

Use native touch behavior.

---

# 17. Signature Interaction 13 — Text Magnetic / Displacement Effects

Large project titles can respond slightly to cursor proximity.

Possible behaviors:

- letters shift a few pixels
- word moves toward pointer
- weight changes subtly
- tracking changes slightly

Use only on major interactive typography.

Do not apply displacement to every paragraph.

---

# 18. Signature Interaction 14 — Scroll Velocity Reactions

Some elements can react to scroll velocity.

Examples:

- project image slight skew
- giant typography shifts slightly
- background media moves faster
- active preview receives a short velocity offset

Velocity should affect **existing motion**, not create chaos.

When scrolling stops:

- elements settle quickly
- no endless drifting

---

# 19. Signature Interaction 15 — Section-to-Section Continuity

Avoid:

```text
SECTION
--------------------
SECTION
--------------------
SECTION
--------------------
```

Instead create transitions using:

- typography
- background changes
- overlap
- image scaling
- clipping
- continuous vertical movement
- shared alignment
- persistent visual motifs

The end of one section should often become the beginning of the next.

---

# 20. KMAI Visual Motif System

The geometric K language should recur subtly.

Possible applications:

- hero reveal
- preloader
- image clipping
- section masks
- project transition
- process visualization
- footer transition

Do not put giant K logos everywhere.

The K should operate as a **visual grammar**.

---

# 21. Preloader

The preloader should be branded and short.

Possible sequence:

1. dark / ivory field
2. K geometry begins assembling
3. logo resolves
4. subtle progress indication
5. transition directly into hero

Avoid:

- percentage counters as decoration
- fake technical metadata
- overly long load animations

The preloader should never make the user wait unnecessarily.

---

# 22. Navigation Motion

Navigation should remain minimal.

Desktop:

- navigation visible or subtly layered
- precise hover states
- understated active state

Menu opening, if used:

- full-screen or large panel
- strong typography
- clip-path / slide / mask transition
- no boxed dropdown ecosystem

Mobile:

- simple menu trigger
- full-screen menu or large overlay
- clear tap targets
- fast open/close

---

# 23. Mobile Design Philosophy

Mobile is not a failed desktop.

Mobile is its own composition.

## Remove or simplify

Generally remove:

- custom cursor
- magnetic interaction
- complex floating physics
- pointer-following previews
- expensive WebGL distortion
- long pinned sequences
- multi-axis parallax
- tiny hover-only interactions

## Keep

- large typography
- strong imagery
- scroll reveals
- simple clip-path transitions
- editorial spacing
- project storytelling
- background transitions
- subtle scale movement

---

# 24. Breakpoint Strategy

Use behavior-driven breakpoints.

Suggested conceptual ranges:

### Large desktop
~1440px and above

Full interaction system.

### Standard desktop / laptop
~1024–1439px

Retain major interactions, reduce density.

### Tablet
~768–1023px

Simplify spatial compositions.

### Mobile
below ~768px

Use intentionally simplified interactions.

These are guidelines. Use actual content constraints to determine final breakpoints.

---

# 25. Desktop Composition Rules

At 1440px+:

- use large visual surfaces
- allow asymmetric composition
- use wide whitespace
- allow projects to extend beyond central alignment
- use cursor interaction
- use layered depth
- use cinematic transitions

Do not fill every pixel.

Large whitespace is intentional.

---

# 26. Tablet Composition Rules

Tablet sits between desktop and mobile.

Reduce:

- number of simultaneous floating objects
- interaction range
- animation amplitude
- typography scale
- pinned duration

Still maintain:

- editorial layout
- strong imagery
- large typography
- selective motion

---

# 27. Mobile Composition Rules

The page should remain visually strong at:

- 390 × 844
- 375 × 812
- 412 × 915

Priorities:

1. readability
2. speed
3. touch response
4. visual hierarchy
5. imagery
6. motion

Do not let animations create huge vertical bloat.

---

# 28. Accessibility

Honor `prefers-reduced-motion`.

When enabled:

- disable cursor trails
- disable magnetic behavior
- remove major transform choreography
- simplify hero reveal
- simplify image distortion
- avoid long pinned interactions
- preserve content order and access

The site must remain understandable without animation.

---

# 29. Interaction Accessibility

Every interaction must have a non-motion equivalent.

Examples:

Project hover:
→ project remains directly accessible through its title.

Cursor preview:
→ image exists in normal page structure for touch.

Magnetic button:
→ standard button still works.

Animated service transition:
→ service content remains readable without the transition.

Do not hide important information exclusively behind hover.

---

# 30. Performance Requirements

Performance is part of the design.

Prioritize:

- transform / opacity animations
- compositing-friendly properties
- lazy-loaded images
- responsive image sizes
- limited active effects
- cleanup of GSAP timelines
- cleanup of event listeners
- reuse of preview elements

Be careful with:

- large fixed backgrounds
- SVG filters
- `feTurbulence`
- heavy blur
- canvas effects
- WebGL
- many simultaneous observers
- dozens of independent animation loops

---

# 31. Existing KMAI Technical Context

The current project already contains reusable motion infrastructure.

Preserve and improve existing components where useful:

- MagneticButton
- CustomCursor
- CaseStudyModal
- responsive media-query hooks
- GSAP / ScrollTrigger
- Lenis

Do not rewrite working infrastructure unnecessarily.

Prefer focused improvements.

---

# 32. Avoid the Previous Visual Failure

The previous direction became too “technical” and looked like a generic AI-generated studio template.

Do NOT recreate:

- boxed sections everywhere
- border-heavy layouts
- dashboard-like cards
- tiny uppercase labels everywhere
- fake coordinates
- fake metadata
- decorative technical terminology
- excessive pills
- blue glow everywhere
- repeated micro-components
- repeated fade-up animations

Especially avoid copy such as:

```text
EST. 2026 // MUMBAI & PUNE
[ 00 / INDEPENDENT DIGITAL TECHNOLOGY STUDIO ]
```

unless genuinely necessary.

The site does not need to announce that it is a digital technology studio in every section.

The work should demonstrate it.

---

# 33. Visual Anti-Vibe-Coding Checklist

For every major section, ask:

### Composition
- Is there a clear focal point?
- Is there enough negative space?
- Does the composition feel intentional?

### Typography
- Is type doing enough visual work?
- Are there meaningful scale differences?
- Are line breaks intentional?

### Interface
- Could the section work without borders?
- Could the section work without cards?
- Are labels actually necessary?

### Motion
- Is the animation communicating something?
- Is timing controlled?
- Does it feel physically plausible?

### Identity
- Does this feel specifically like KMAI?
- Is the K geometry being used meaningfully?
- Does the palette support the composition?

### Originality
- Could a generic AI website generator produce this?
- Does this look like a template?

If the answer to the final question is yes:

**redesign the section.**

---

# 34. Suggested End-to-End Experience

The complete page should feel approximately like this:

## Opening
Full-screen hero.
KMAI identity.
Minimal elements.
No fake metadata.

↓

## Scroll
Hero remains pinned.
K geometry transforms.
Website begins appearing underneath.

↓

## Reveal completion
Normal page emerges.
Large editorial statement.

↓

## Selected Work
Floating/asymmetric project field.
User moves pointer.
Projects respond physically.

↓

## Project interaction
Hover → large preview appears.
Cursor changes.
Image follows.

↓

## Click
Project expands.
Image becomes case-study hero.

↓

## Return to site
Large typography re-enters.

↓

## Services
One large typographic composition.
Service state changes during scroll.

↓

## Studio
Human imagery.
Editorial composition.

↓

## Process
DISCOVER → ARCHITECT → ENGINEER → SCALE.
One continuous transformation.

↓

## Client Voices
Large quote.
Minimal identity.
Scroll into next quote.

↓

## Dark Event
Sudden change to deep ink.
Large statement.

↓

## Contact
Huge final CTA.
Minimal UI.

↓

## Footer
Quiet resolution.

---

# 35. Implementation Order

Do not implement all motion simultaneously.

## Phase 1 — Foundation
- typography
- palette
- spacing
- container system
- K motif
- reduced-motion handling
- responsive behavior

## Phase 2 — Hero
- pinned hero
- scroll-driven reveal
- K geometry integration
- mobile simplification

## Phase 3 — Selected Work
- floating composition
- project previews
- cursor behavior
- hover interactions

## Phase 4 — Case Study Transition
- shared-element / FLIP transition
- page entry/exit
- route continuity

## Phase 5 — Services
- giant typography
- scroll-driven service states

## Phase 6 — Process
- continuous transformation
- responsive simplification

## Phase 7 — Testimonials
- editorial quote transitions

## Phase 8 — Dark Event + Contact
- background transition
- final CTA choreography

## Phase 9 — Polish
- cursor tuning
- magnetic strength
- timing
- easing
- scroll velocity
- image crops
- mobile simplification

## Phase 10 — Verification
Test at:

- 1440 × 900
- 1920 × 1080
- 1024 × 768
- 768 × 1024
- 390 × 844
- 375 × 812
- 412 × 915

Verify:

- no horizontal overflow
- no layout jumps
- no pinned-scroll bugs
- no stuck cursor
- no memory leaks from repeated transitions
- no broken keyboard interaction
- reduced-motion behavior
- acceptable performance

---

# 36. Antigravity Operating Instructions

Before implementing a major interaction:

1. Inspect the existing implementation.
2. Identify reusable components and animation utilities.
3. Inspect the actual browser output.
4. Decide which DOM structure is required.
5. Implement the smallest correct version.
6. Test it at desktop and mobile.
7. Capture a screenshot.
8. Critique the visual result.
9. Tune timing, spacing, scale, and easing.
10. Only then continue.

Do not assume code correctness means visual correctness.

---

# 37. Browser Verification Checklist

For every major interaction, verify:

## Desktop

### 1440 × 900
Primary design reference.

### 1920 × 1080
Check that the composition does not become too empty or too small.

### 1024 × 768
Check laptop-scale behavior.

## Tablet

### 768 × 1024
Check layout transition.

## Mobile

### 390 × 844
Primary mobile reference.

### 375 × 812
Check smaller screen.

### 412 × 915
Check larger mobile.

---

# 38. What “Insane on Desktop” Actually Means

“Insane” does NOT mean:

- more gradients
- more particles
- more 3D objects
- more glowing effects
- more cards
- more animations

“Insane” means:

- the hero transition is memorable
- projects feel physical
- typography feels oversized and intentional
- cursor interaction feels custom
- project entry feels seamless
- sections transform instead of simply stacking
- the site has a strong visual rhythm
- the K motif becomes part of the experience
- the user discovers interactions naturally

The complexity should be **felt**, not displayed as a collection of effects.

---

# 39. Final Design Standard

The final KMAI site should answer “yes” to all of these:

- Does it look designed rather than generated?
- Does the portfolio feel like the centerpiece?
- Does the hero create a memorable first interaction?
- Is the K geometry integrated into the experience?
- Does the desktop version feel visually exceptional?
- Does mobile remain clean and fast?
- Are interactions discoverable without instructions?
- Is typography doing significant visual work?
- Is there enough empty space?
- Are cards and borders used sparingly?
- Does motion have purpose?
- Does the site feel coherent from beginning to end?
- Could KMAI plausibly use this as its flagship website?

The target is:

> **quiet by default, exceptional when interacted with.**
