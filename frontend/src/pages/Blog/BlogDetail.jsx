import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft, Calendar, Clock, User, Tag, ChevronRight,
  Briefcase, Calculator, Shield, Hammer, TrendingUp, Building,
  BookOpen, Share2, Copy, Check, ArrowRight
} from "lucide-react";
import { blogPosts, CategoryBadge } from "./BlogPage";
import ContactModal from "../../components/ContactModal";
import RainbowButton from "../../components/RainbowButton";
import useDeviceType from "../../hooks/useDeviceType";

// ─── Full Blog Content ─────────────────────────────────────────────────────────
const blogContent = {
  1: {
    sections: [
      {
        heading: "The Digital Revolution in Indian Construction",
        body: `India's construction sector is on the cusp of a sweeping transformation. For decades, the industry operated on paper-based processes, verbal contracts, and intuition-driven decision-making. Today, the pressure from mega-infrastructure programs like PM GatiShakti, Smart Cities Mission, and AMRUT has forced project management consultancies to rethink how they work from the ground up.

The shift isn't simply about technology adoption — it's about fundamentally changing how projects are planned, monitored, and delivered. Construction PMCs that fail to evolve will find themselves priced out of competitive bids where clients now demand digital reporting, real-time dashboards, and data-backed decision-making as standard deliverables.`
      },
      {
        heading: "AI-Powered Scheduling and Risk Management",
        body: `Artificial intelligence is no longer a futuristic concept in construction — it's already reshaping planning cycles. AI-based scheduling tools can now analyse historical project data, weather patterns, supply chain disruptions, and resource availability to generate dynamic schedules that self-correct in real time.

At MANO, we've begun piloting machine learning models for delay prediction on our larger PMC projects. By feeding in variables like contractor workforce levels, material delivery timelines, and daily progress inputs, the models can flag a likely delay 3-4 weeks before it becomes critical — giving the team time to intervene rather than react.

Risk quantification using Monte Carlo simulations is also gaining traction. Instead of treating risk registers as compliance documents, forward-looking PMCs are using probabilistic models to assign realistic buffers and contingency reserves to project schedules.`
      },
      {
        heading: "IoT-Enabled Site Monitoring",
        body: `Internet of Things (IoT) technology is quietly transforming construction site oversight. Sensors embedded in concrete formwork can track curing time and structural integrity in real time. Environmental monitoring stations measure dust, noise, and vibration levels continuously — enabling proactive EHS compliance rather than reactive auditing.

Smart helmets and wearable devices are being piloted on high-rise projects to track worker location, detect falls, and monitor fatigue levels. The data feeds directly into site management dashboards, giving project managers unprecedented visibility from anywhere in the world.

For PMC firms managing multiple projects simultaneously, centralised IoT dashboards eliminate the dependency on daily site visits for status checks. A project manager in Mumbai can monitor the concrete pour progress on a Pune site with the same confidence as if they were standing on the scaffolding.`
      },
      {
        heading: "Digital Twins and BIM Integration",
        body: `Building Information Modelling (BIM) has evolved from a design tool into the backbone of the entire project lifecycle in forward-thinking organisations. A digital twin — a live, data-connected 3D model of the project — allows PMCs to simulate construction sequences, identify clashes, and plan logistics before a single brick is laid.

The Government of India's mandate for BIM adoption on infrastructure projects above a certain value threshold is driving rapid uptake. PMCs that can offer integrated BIM-based monitoring — linking the model to site progress photographs, drone surveys, and IoT sensor data — will have a significant competitive advantage in the coming years.`
      },
      {
        heading: "The 2026 Outlook: What PMCs Must Do Now",
        body: `The shift is happening faster than most expect. Here's what project management consultancies must prioritise in 2026:

**Invest in digital project management platforms.** Tools like Procore, Aconex, or locally developed alternatives that unify scheduling, cost control, RFI tracking, and quality checklists are no longer optional.

**Build data literacy across teams.** Technology is only as good as the people operating it. Training mid-level engineers to interpret dashboards, run reports, and flag anomalies is as important as the software investment itself.

**Develop standardised digital processes.** Ad-hoc digitisation — different teams using different tools — creates data silos. Standardised templates, workflows, and reporting formats are the foundation of a scalable digital PMC.

**Partner with PropTech startups.** India's construction technology ecosystem is vibrant. PMCs that form early partnerships with emerging platforms will gain access to cutting-edge tools before they become mainstream.

The construction sector's digital revolution isn't coming — it's already here. The PMCs that thrive in 2026 and beyond will be those that have already started building their digital muscle today.`
      }
    ],
    keyTakeaways: [
      "AI scheduling tools can flag delays 3-4 weeks before they become critical",
      "IoT site monitoring enables proactive EHS compliance from anywhere",
      "Digital twins linked to live site data provide unprecedented project visibility",
      "BIM adoption is becoming mandated for large infrastructure projects in India",
      "PMCs must invest in platform standardisation, not just tool adoption"
    ]
  },
  2: {
    sections: [
      {
        heading: "Why Cost Overruns Are Endemic to Residential Projects",
        body: `Cost overruns in residential construction aren't accidental — they're structural. The typical residential tower project in India involves dozens of sub-contractors, hundreds of material categories, and a procurement chain that stretches from national suppliers to local vendors. At any of these nodes, cost leakage can occur silently for months before being caught.

Our analysis of 40+ residential projects across Mumbai, Pune, and Bengaluru found that cost overruns of 12-18% are statistically normal — and preventable overruns of a further 8-10% are consistently traceable to just five root causes.`
      },
      {
        heading: "Step 1: Fix the BOQ Before You Break Ground",
        body: `The Bill of Quantities is the financial backbone of any residential project. Yet in practice, we regularly encounter BOQs that were hurriedly assembled from previous project templates without site-specific adjustment.

A precise BOQ requires a detailed soil investigation report, topographic survey, and structural design completion — not an architectural concept drawing. When these inputs are missing, the BOQ is padded with assumptions that crystallise into cost overruns once actual site conditions are revealed.

MANO's standard process involves a multi-stage BOQ review: a QS lead validates quantities against structural drawings, a cost engineer benchmarks unit rates against market data from the last 90 days, and the PMC validates line items against the project scope.`
      },
      {
        heading: "Step 2: Implement Rigorous Measurement-Based Billing",
        body: `The single greatest source of cost overrun in sub-contractor billing is measurement disputes — or worse, the absence of dispute, where inflated measurements are accepted without verification.

Measurement-based billing requires physical joint measurements (attended by client, PMC, and contractor representatives) at every billing cycle. Running meters for plumbing, painted surface area for finishes, cubic meters for concrete — each quantity must be site-verified, not estimated.

On a 300-apartment residential tower, the difference between certified and estimated billing for internal plastering alone can exceed ₹40-60 lakhs across the project lifecycle.`
      },
      {
        heading: "Step 3: Establish a Formal Change Order Protocol",
        body: `Scope creep is budget creep. On almost every residential project we've taken over as PMC, we've found a history of verbal change orders that never made it into the contract register — and subsequently became disputes.

A formal change order protocol requires that no scope variation — however minor — proceeds without a written variation order signed by both the project manager and contractor, with an agreed cost impact documented before the work begins. Verbal approvals, WhatsApp confirmations, and site instruction books are insufficient.

This discipline requires cultural change. Site engineers habituated to solving problems quickly will resist the process. The PMC's role is to enforce it consistently from day one.`
      },
      {
        heading: "Steps 4 & 5: Monthly Cost-at-Completion Forecasting and Value Engineering",
        body: `Step 4: Monthly Cost-at-Completion (CAC) forecasting replaces the reactive question "are we over budget?" with the proactive question "where are we headed?" A CAC model extrapolates current spending rates against remaining quantities and scope to project the final cost — enabling course correction while there is still time.

Step 5: Value Engineering is often misunderstood as cost-cutting. Done correctly, VE is about achieving the same functional outcome at a lower cost without compromising quality. On a residential tower, VE opportunities typically appear in structural optimisation (reducing steel tonnage through design refinement), MEP coordination (eliminating clashes before installation), and facade specification (achieving comparable aesthetics at preferential rates).

Implementing these five steps consistently is the difference between a project that delivers on its budget promise and one that becomes a case study in how not to manage residential construction.`
      }
    ],
    keyTakeaways: [
      "Cost overruns of 12-18% are statistically normal but preventable in residential projects",
      "BOQs must be based on completed structural drawings, not architectural concepts",
      "Joint physical measurements at every billing cycle prevent sub-contractor over-billing",
      "No scope variation should proceed without a signed, costed change order",
      "Monthly Cost-at-Completion forecasting enables proactive budget management"
    ]
  },
  3: {
    sections: [
      {
        heading: "Why Generic QA/QC Checklists Fail on Indian Construction Sites",
        body: `Walk into most construction sites in India and you'll find a QA/QC plan filed neatly in a binder on the site engineer's desk. Browse through it and you'll find generic checklists — many copied from international standards — that bear little resemblance to the actual work happening on site.

The fundamental problem is that quality control frameworks are designed as compliance documents rather than operational tools. They're produced to satisfy client contracts or ISO certification audits, not to actually prevent defects. The result: quality issues that were eminently preventable get discovered during finishing or, worse, post-handover.`
      },
      {
        heading: "The MANO Adaptive QA/QC Matrix",
        body: `Over 50+ projects and 12 years, MANO has developed what we call the Adaptive QA/QC Matrix — a framework that evolves based on project type, contractor profile, and phase-specific risk. Rather than a static checklist applied uniformly across the project, the matrix identifies which quality checkpoints are critical for which specific contractors based on their known failure modes.

For example, a sub-contractor with a history of formwork deviations will have additional inspection points at every Pour Release stage. A plastering contractor with an upward slab thickness record will have thickness gauges checked at every 6 sq.m. These targeted interventions are more effective than blanket inspection schedules that treat all contractors equally.`
      },
      {
        heading: "Phase-Specific Quality Interventions",
        body: `Our matrix organises quality interventions by construction phase, with specific acceptance criteria and hold points at each stage:

**Substructure Phase:** Concrete cube testing at every pour, cover block verification before every pour, reinforcement lapping audits against drawing, pre-pour checklist sign-off by both contractor QA and MANO inspector.

**Superstructure Phase:** Formwork alignment checks using total station survey, floor flatness measurements after each slab, column verticality monitoring, MEP sleeve positioning verification before concrete.

**Finishing Phase:** Surface preparation audits before every application layer, paint DFT (dry film thickness) measurement on every floor, waterproofing flood tests before screed application, door and window frame alignment checks.

Each intervention has a documented accept/reject threshold. Non-conformance reports are raised digitally and tracked to closure — a practice that creates accountability and an audit trail that informs future project quality plans.`
      },
      {
        heading: "The Contractor Feedback Loop",
        body: `The most powerful element of an effective QA/QC system isn't the inspection — it's the feedback loop. When a quality failure is identified, the root cause analysis (RCA) determines whether the failure was due to a process gap, a materials issue, or a supervision failure.

Over time, the RCA database reveals patterns. One contractor's concrete consistently shows entrapped air pockets — suggesting inadequate vibration technique. Another's rebar placement is consistently within tolerance at the first inspection but deviates by the time the pour is scheduled — suggesting inadequate supervision between inspection and pour. These patterns inform targeted training and supervision decisions.

The goal isn't to catch failures after they occur — it's to use data from failures to prevent recurrence systematically.`
      }
    ],
    keyTakeaways: [
      "Generic QA/QC checklists are compliance documents, not operational quality tools",
      "Adaptive quality matrices target interventions based on contractor-specific failure modes",
      "Hold points at critical construction phases with documented acceptance criteria are essential",
      "Root cause analysis of quality failures drives systematic prevention, not just correction",
      "Digital NCR tracking creates accountability and informs future quality planning"
    ]
  },
  4: {
    sections: [
      {
        heading: "Understanding the EPC vs PMC Decision",
        body: `The EPC versus PMC question is one of the most consequential decisions an infrastructure developer makes — and it's made too often on the basis of price alone. Both models have legitimate applications, and the wrong choice for a given project profile can result in cost overruns, timeline failures, or quality shortfalls that far exceed any initial price advantage.

At the core, the choice is about risk allocation and control. EPC transfers design, procurement, and construction risk to a single contractor in exchange for a fixed price. PMC retains control with the owner but distributes execution risk across multiple contractors under expert oversight.`
      },
      {
        heading: "EPC: Where It Works and Where It Doesn't",
        body: `EPC works best when the scope is well-defined and unlikely to change, when the owner has limited in-house technical capability, and when time-to-completion is the paramount constraint. Industrial plants, power facilities, and oil and gas installations are classic EPC applications where the technology is proprietary, the interfaces are well-understood, and the client is primarily a financial investor.

For Indian infrastructure and real estate, EPC is appropriate for repetitive residential schemes (plotted developments, township housing units), standardised commercial fit-outs, and infrastructure packages where specifications are prescribed by a regulatory authority.

EPC fails when scope definition is incomplete, when the owner expects to exercise design influence during construction, or when the project involves phased development where scope will evolve. In these situations, the EPC contractor either prices an excessive risk premium upfront or manages risk through aggressive variation claims during execution.`
      },
      {
        heading: "PMC: Control at a Price",
        body: `Project Management Consultancy gives the owner direct control over design evolution, procurement decisions, and contractor selection — at the cost of retained risk and greater management burden.

The PMC model is best suited for complex, custom projects where quality and design intent are paramount, where the owner has strong views on contractor selection, and where the project will span multiple phases or evolve in scope. Premium residential towers, landmark commercial developments, and mixed-use complexes with bespoke specifications fall into this category.

The owner under a PMC model must be willing to invest in the consultancy relationship — providing timely decisions, funding procurement in advance of work, and maintaining adequate client-side resources for approval and oversight functions.`
      },
      {
        heading: "A Framework for the Decision",
        body: `Rather than prescribing EPC or PMC universally, we recommend evaluating four factors:

**Scope certainty:** How well-defined is the scope today? How likely is it to change? High uncertainty favours PMC.

**Owner capability:** Does the owner have the in-house technical or time resources to manage a PMC engagement? Low capability favours EPC.

**Quality priority:** Is delivery speed or quality differentiation the primary success metric? Quality priority favours PMC.

**Market conditions:** Is the preferred EPC contractor market competitive and qualified? Thin markets with limited EPC capacity may favour PMC regardless of other factors.

The honest answer is that for most complex Indian infrastructure and real estate projects, a hybrid model — where a capable PMC oversees multiple specialist contractors under a structured contractual framework — delivers better outcomes than either pure EPC or unmanaged multi-contract approaches.`
      }
    ],
    keyTakeaways: [
      "EPC transfers design, procurement, and construction risk to a single contractor",
      "PMC retains owner control but requires greater management bandwidth and client resources",
      "EPC works best with well-defined scope; PMC suits evolving, complex projects",
      "Owner capability, scope certainty, and quality priority are the key decision variables",
      "Hybrid PMC models often outperform pure EPC on complex Indian real estate projects"
    ]
  },
  5: {
    sections: [
      {
        heading: "Green Building in India: From Aspiration to Requirement",
        body: `The green building movement in India has crossed a critical inflection point. What was once a marketing differentiator for premium residential and commercial projects has become a regulatory expectation, a financial incentive, and — increasingly — a tenant and buyer requirement.

LEED (Leadership in Energy and Environmental Design), GRIHA (Green Ratings for Integrated Habitat Assessment), and IGBC (Indian Green Building Council) ratings are now explicitly referenced in several state government policies, and Union Budget incentives for energy-efficient buildings are pushing developers to take certification seriously even when it isn't mandatory.`
      },
      {
        heading: "The Financial Case for Green Buildings",
        body: `The perception that green buildings cost significantly more than conventional construction has been systematically debunked by real-world data. The incremental cost of achieving a GRIHA 3-star or LEED Silver rating on a well-planned project is typically 3-5% of construction cost — and payback periods through energy savings are now well under 7 years for most commercial buildings.

The revenue case is even more compelling. Green-certified office buildings in Bengaluru, Hyderabad, and Pune command rental premiums of 8-15% over non-certified comparable properties. In residential, IGBC-certified apartments in Mumbai and NCR are achieving price premiums of 5-8% — and selling faster.

Financial institutions are also beginning to price green certification into project financing. Several SEBI-regulated green bonds and climate finance facilities now offer preferential rates for projects with credible green certification frameworks.`
      },
      {
        heading: "Key Compliance Requirements for Developers",
        body: `For developers embarking on green building certification, the most impactful interventions happen at the design stage:

**Energy modelling:** A certified energy simulation using software like eQUEST or EnergyPlus must demonstrate a specified percentage reduction versus baseline. This shapes HVAC specification, glazing ratios, and building orientation decisions.

**Water efficiency:** Rainwater harvesting, greywater recycling, and low-flow fixture specification are now standard requirements across all three major rating systems. For projects in water-stressed cities like Chennai and Bengaluru, these measures have operational as well as compliance value.

**Materials sourcing:** Regional material sourcing (within 500-800 km of site), recycled content requirements, and restrictions on ozone-depleting substances require procurement teams to think beyond cost and availability.

**Site ecology:** Construction waste management plans, soil erosion controls during construction, and heat island mitigation through light-coloured hardscape and green cover are evaluated at both construction and operations stages.`
      },
      {
        heading: "The Role of PMC in Green Certification",
        body: `Green building certification requires active management throughout the project lifecycle — not just at design stage. The PMC's role in a green-certified project extends beyond conventional monitoring to include commissioning oversight, materials documentation, and third-party audit coordination.

At MANO, we've embedded green building checklists into our standard site monitoring protocols for projects targeting GRIHA or LEED certification. Our site teams are trained to document material deliveries for regional sourcing credits, maintain construction waste segregation logs, and coordinate LEED commissioning authority visits at the appropriate project milestones.

The complexity of managing green certification documentation should not be underestimated. Without dedicated PMC oversight, developers frequently find that they've constructed a building that performs sustainably but loses certification credits due to inadequate documentation.`
      }
    ],
    keyTakeaways: [
      "Incremental cost of GRIHA 3-star or LEED Silver is typically 3-5% of construction cost",
      "Green-certified office buildings command rental premiums of 8-15% in major Indian cities",
      "Energy modelling at design stage is the single most impactful green building decision",
      "PMC involvement is critical for maintaining green certification documentation throughout construction",
      "Financial institutions are beginning to price green certification into project financing rates"
    ]
  },
  6: {
    sections: [
      {
        heading: "The Five Contract Clauses That Generate 80% of Disputes",
        body: `In our experience across 50+ projects and hundreds of contractor engagements, a remarkably consistent pattern emerges: the vast majority of contractual disputes trace back to the same five clause categories — scope definition, measurement methodology, variation order procedures, payment milestones, and defect liability.

Understanding why these clauses are chronically problematic — and what precise drafting can prevent — is the most practical risk management investment a developer or PMC can make before a project begins.`
      },
      {
        heading: "Dispute 1: Ambiguous Scope of Work",
        body: `The scope of work section is the most frequently disputed clause in Indian construction contracts — and the most frequently written by people who haven't built anything.

Effective scope clauses specify not just what the contractor will do, but what they won't do, what coordination they're responsible for, what documentation they must provide, and what standards of workmanship apply. The clause must reference specific drawings (with revision numbers), specifications, and BOQ items — and state explicitly that all three documents together define the scope.

The fix: Scope clauses should include a hierarchy of documents clause — stating which document prevails if there is a conflict — and a list of exclusions that explicitly names items not included in the contract.`
      },
      {
        heading: "Disputes 2 & 3: Measurement Methodology and Variation Orders",
        body: `Measurement disputes arise when the contract references a measurement standard (like IS 1200) without specifying which parts apply to which work items, or — worse — when the contract is silent on measurement methodology entirely.

The fix: Specify measurement methodology item by item for the major work packages. For concrete, specify whether measurement is by theoretical volume or actuals. For plastering, specify whether deductions are made for openings below a certain area. Removing ambiguity removes the dispute.

Variation order disputes arise from verbal or implied variations that were never formally documented. The fix is procedural: a clause requiring that any variation — whether client-instructed or contractor-proposed — must be documented on a prescribed form before work commences, with cost impact agreed in writing.`
      },
      {
        heading: "Disputes 4 & 5: Payment Milestones and Defect Liability",
        body: `Payment milestone disputes typically arise from two drafting failures: milestones that are ambiguous (what exactly constitutes "structure completion"?) and milestones that are disconnected from actual cash flow requirements (a milestone triggered by an event outside the contractor's control).

The fix: Payment milestones should reference specific, objectively verifiable events — not vague completion states. "Slab at Level 3 poured and cured, as certified by PMC" is unambiguous. "Structure at 3rd floor stage" is not.

Defect Liability Period (DLP) clauses generate disputes when they are silent on who is responsible for consequential damage, when the DLP trigger date is unclear, and when the retention release mechanism isn't specified. A well-drafted DLP clause answers all three questions explicitly.`
      }
    ],
    keyTakeaways: [
      "80% of construction disputes trace to just five clause categories",
      "Scope clauses must reference specific drawing revision numbers and include an exclusions list",
      "Measurement methodology should be specified item-by-item for major work packages",
      "No variation — however minor — should proceed without a signed, costed variation order",
      "Payment milestones should be tied to objectively verifiable, PMC-certifiable events"
    ]
  },
  7: {
    sections: [
      {
        heading: "Mumbai's Real Estate Supercycle",
        body: `Mumbai and the broader Mumbai Metropolitan Region (MMR) are experiencing a real estate supercycle unlike anything the market has seen since the mid-2000s boom. The difference this time is that the demand is more broadly distributed — not concentrated in South Mumbai or Bandra-Kurla Complex, but spread across the MMR belt including Borivali, Thane, Navi Mumbai, Kalyan, and beyond.

The drivers are structural: Mumbai's population continues to grow faster than housing supply, the RERA-chastened developer community has largely consolidated around credible players, and the Dharavi redevelopment along with the Metro expansion corridors are unlocking new development land in locations that were previously uneconomical.`
      },
      {
        heading: "What the Boom Means for PMC Firms",
        body: `For project management consultancies, the MMR boom is creating extraordinary opportunity — and significant operational stress. The pipeline of projects across our Mumbai regional team has grown by 140% in the past 18 months, and the talent market for experienced site engineers, QS professionals, and planning managers has never been tighter.

The operational response requires PMC firms to think differently about how they scale. Traditional models — where a senior project manager personally oversees 2-3 projects — cannot absorb a 5-10x pipeline expansion. The firms that are scaling successfully are those that have invested in digital monitoring platforms, standardised processes, and structured mid-level management layers that reduce senior oversight dependency.`
      },
      {
        heading: "Western Suburbs: Borivali to Dahisar",
        body: `The Western Suburbs corridor from Borivali to Dahisar has emerged as one of the highest-velocity real estate markets in India. Metro Line 2A and 7 extensions have dramatically improved connectivity, and several large-scale residential developments that were stalled post-RERA are now moving rapidly.

MANO's presence in this corridor spans multiple ongoing PMC engagements for mid-market residential towers ranging from 12 to 42 storeys. The typical project profile — 200-400 apartments, mixed stilt+basement parking, clubhouse and amenity floors — is challenging from a PMC standpoint because it sits at the intersection of volume execution and quality expectations from increasingly sophisticated buyers.`
      },
      {
        heading: "Navi Mumbai: The Infrastructure Play",
        body: `Navi Mumbai is experiencing a second wave of development driven by Navi Mumbai International Airport construction, the Trans-Harbour Link, and CIDCO's ongoing town development programme. Unlike the Western Suburbs where redevelopment of existing stock is common, Navi Mumbai offers greenfield development land — which creates both opportunity and complexity.

Greenfield PMC engagements require more upfront planning bandwidth — site infrastructure establishment, utility connections, approach road coordination with CIDCO — before construction can begin. PMC firms entering Navi Mumbai without this local regulatory knowledge find themselves caught between project timelines and approvals processes that operate on their own logic.`
      }
    ],
    keyTakeaways: [
      "MMR real estate pipeline growth of 140%+ is creating both opportunity and operational stress for PMCs",
      "Traditional 2-3 project per senior manager models cannot scale to meet current demand",
      "Digital monitoring platforms and standardised processes are enabling scalable PMC delivery",
      "Western Suburbs (Borivali-Dahisar) and Navi Mumbai are the two highest-velocity MMR markets",
      "Greenfield Navi Mumbai projects require deep CIDCO regulatory knowledge from day one"
    ]
  },
  8: {
    sections: [
      {
        heading: "Why EHS Compliance Is a Project Risk, Not Just a Regulatory Requirement",
        body: `Environment, Health, and Safety non-compliance on construction sites is not a peripheral concern — it is a project risk with direct financial, timeline, and reputational consequences. A single serious accident can halt a project for weeks during regulatory investigation. Multiple non-conformance findings in an EHS audit can trigger stop-work notices that derail carefully planned timelines.

Beyond compliance, EHS performance is increasingly a client requirement. Institutional developers, multinational corporates commissioning build-to-suit facilities, and government infrastructure clients all now include EHS audit scores as part of contractor prequalification assessments.`
      },
      {
        heading: "The 30-Point Audit Checklist: Foundation Elements",
        body: `Our 30-point EHS audit checklist is organised into five domains. The first domain — Site Safety Infrastructure — covers the physical environment:

1. Perimeter hoarding with reflective markings and approved dimensions
2. Designated and marked pedestrian access routes separate from vehicle access
3. First aid station stocked per IS 4130 requirements with trained first aider on site
4. Personal protective equipment (PPE) store with PPE availability for all site workers
5. Safe electrical connections with ELCB/RCD protection on all temporary power connections
6. Scaffolding with tie-back at specified intervals, toe boards, guardrails installed
7. Ladders secured at top and bottom, angle verified (75-degree standard)
8. Excavation edge protection with barriers and warning tape`
      },
      {
        heading: "Worker Safety and Documentation Requirements",
        body: `The second and third domains cover Worker Safety Procedures and Documentation Requirements:

**Worker Safety (Points 9-18):**
9. Tool box talks conducted and sign-off sheets maintained for the past 7 days
10. Induction records for every worker currently on site
11. Working at height permit system with height greater than 2 metres requiring permit
12. Hot work permit system for grinding, welding, gas cutting operations
13. Confined space entry permit for underground sump and tank work
14. Permit-to-load for crane and heavy equipment lifting operations
15. Fire extinguisher placement (one per 100 sq.m.), inspection tags current
16. Emergency evacuation plan displayed at site entrance and mustering point
17. Night work lighting adequacy (minimum 150 lux at work face per IS standard)
18. Chemical storage MSDS sheets available for all hazardous materials on site

**Documentation (Points 19-22):**
19. Accident Near-Miss Register with all entries within 24 hours of occurrence
20. Daily safety inspection register maintained by safety officer
21. EHS compliance matrix for applicable statutory requirements
22. Contractor EHS plan approved and current`
      },
      {
        heading: "Environmental and Equipment Requirements",
        body: `**Environmental Compliance (Points 23-26):**
23. Construction waste segregation at source (concrete debris, steel scrap, packaging separately)
24. Silt trap or decanting tank for stormwater drainage from site
25. Cement and chemical storage weatherproof with spill containment bund
26. Dust suppression system operational during dry, windy conditions

**Equipment Safety (Points 27-30):**
27. Tower crane third-party inspection certificate current with load test certification
28. Mobile crane operator license, fitness certificate of equipment current
29. Concrete pump and boom placer safety devices operationally tested  
30. DG set earthing, fuel storage double-walled or bunded to prevent contamination

A score below 70% on this audit triggers immediate corrective action planning. Below 50% triggers stop-work at the relevant work fronts until critical items are rectified.`
      }
    ],
    keyTakeaways: [
      "EHS non-compliance creates direct project risk through stop-work orders and regulatory investigation",
      "The 30-point checklist is organised across five domains: infrastructure, worker safety, documentation, environment, and equipment",
      "Working at height (>2m), hot work, confined space, and lifting operations all require formal permit systems",
      "Audit scores below 70% require immediate corrective action planning",
      "EHS performance is increasingly a contractor prequalification requirement for institutional clients"
    ]
  },
  9: {
    sections: [
      {
        heading: "The Ananda Residency Challenge",
        body: `When MANO was appointed as PMC for Ananda Residency in Borivali in early 2023, the project had already been stalled for 11 months. The superstructure was at 4th floor level, two contractors had been terminated, and the developer was facing funding pressure from financiers concerned about project delay.

The 3,10,230 sq.ft. development — comprising 312 apartments across two wings with 2B+G+31 typical floors — represented one of the most complex PMC recovery assignments our team had undertaken. What followed over the next 26 months was an intensive exercise in planning recovery, contractor management, and change leadership.`
      },
      {
        heading: "The Planning Recovery",
        body: `Our first task was establishing the true baseline. The existing schedule was a 2019 Primavera file that hadn't been updated since the first contractor was terminated. We spent three weeks on a comprehensive status survey: concrete volumes poured by zone, embedded MEP progress, material on-site inventory, and outstanding approvals from MCGM.

From this baseline, we developed a recovery schedule using CPM analysis that identified the critical path as passing through the structural package — which required immediate re-tendering with a tightly pre-qualified contractor list. The recovery schedule showed on-time delivery was possible only if the structural package was recommenced within 45 days.

The challenge: the developer's procurement process typically took 90 days. We compressed it to 38 days through parallel evaluation — enabling technical and commercial scoring to run simultaneously rather than sequentially.`
      },
      {
        heading: "Contractor Management and the Trust Problem",
        body: `The incoming structural contractor — a mid-sized firm from Thane with an excellent track record on similar projects — entered the engagement with understandable wariness. Previous contractors had faced payment delays that contributed to the project's troubled history.

We established a weekly project account review protocol where the contractor's billing team met directly with the developer's finance team in MANO's presence. Payment forecasts were shared 8 weeks in advance, and a ring-fenced mobilisation deposit was maintained in an escrow arrangement — a condition we insisted on as PMC before the contractor's appointment was finalised.

The result: zero payment disputes over the 26-month engagement. The relationship between developer and contractor was more transparent and trusting than on most conventional projects — because structural oversight of cash flows had been designed into the engagement from day one.`
      },
      {
        heading: "On-Time Delivery: The Last 90 Days",
        body: `The final 90 days of a large residential project are always the most intensive. With multiple finishing trades working simultaneously — painting, tile laying, MEP commissioning, lift installation, landscaping — coordination breakdowns are a daily risk.

We implemented a room-by-room completion tracking system, using a simple colour-coded status on a mirrored floor plan updated daily. Green rooms were client-ready; yellow rooms had open snag items; red rooms had outstanding work. The developer's sales team had visibility of the same dashboard — enabling apartment handovers to be sequenced as ready units were completed rather than waiting for full-building completion.

By sequencing handovers by floor and wing, the developer was able to begin generating revenue from completed units while finishing work continued on others — preserving the financial deadline even though the last units were completed 3 weeks after the contractual completion date for the full building.`
      }
    ],
    keyTakeaways: [
      "Recovery projects require a true baseline survey before any schedule recovery planning",
      "Parallel procurement evaluation can compress 90-day processes to under 45 days when necessary",
      "Escrow-based payment protections improve contractor trust and eliminate payment disputes",
      "Room-by-room completion tracking enables phased handovers that protect developer cash flow",
      "Sequenced handovers allow revenue generation while remaining finishing work continues"
    ]
  },
  10: {
    sections: [
      {
        heading: "The Scale of the Over-Billing Problem",
        body: `Construction over-billing in India is not occasional — it is systematic. Our Quantity Survey team analysed 1,247 invoices across 15 residential and commercial projects, covering ₹340 crores of contractor billings. The finding: 23% of invoices contained billing irregularities, and 68% of projects had at least one material over-billing event that, if unchecked, would have resulted in client overpayment.

This is not exclusively a contractor ethics problem — though ethics matter. Many billing irregularities arise from measurement ambiguity, specification disputes, and documentation gaps that create legitimate disagreement about quantities. Proper QS practice removes the ambiguity.`
      },
      {
        heading: "The Most Common Billing Irregularities",
        body: `From our analysis, six categories of irregularity appeared most frequently:

**Measurement inflation** (appearing in 41% of irregular invoices): Quantities billed in excess of site measurement. Most common in structural concrete, plastering, and flooring. The fix is joint measurement before billing.

**Specification upgrading** (31%): Billing for a superior specification than what was actually installed. Common in MEP where brands are substituted without formal approval. Requires delivery challans cross-checked against approved materials list.

**Preliminary duplication** (28%): Contractor bills for site establishment costs (scaffolding, DG, hoarding) across multiple invoices. Requires a lifecycle tracking register for preliminaries.

**Variation without approval** (24%): Work billed as a variation that is actually within the original scope. Requires a rigorous scope document and variation approval protocol.

**Earlier-stage billing in advance** (19%): Billing for milestone completion before the milestone is actually achieved. Requires PMC certification to precede billing.

**Material price escalation without contractual basis** (15%): Price hikes billed against a fixed-price contract without a valid escalation clause. Requires contract analysis before approving any rate revision.`
      },
      {
        heading: "Building a QS-Led Billing Control System",
        body: `Effective billing control is a system, not a periodic audit. The system has three elements:

**Pre-billing measurement:** The QS team conducts independent measurements before the contractor submits any invoice. The contractor's bill is then reconciled against these measurements — not the other way around.

**Materials reconciliation:** For material-supply contracts, the QS team maintains a running materials account that tracks deliveries (by delivery challans), usage (by site measurement), and wastage (by material-specific allowances). Contractor billing for materials is checked against this account monthly.

**Payment certification protocol:** No invoice is approved for payment without QS certification. The certification states the verified quantity, the applicable rate, and any deductions. This document is the audit trail for every payment made on the project.

These three elements, implemented from project inception, can reduce billing irregularities by 85% compared to reactive audit-based approaches.`
      },
      {
        heading: "The ROI of Proper Quantity Surveying",
        body: `Developers consistently ask us about the cost justification for full-time QS resources on their projects. The numbers are compelling.

On a ₹100 crore construction project with typical billing irregularity patterns, our analysis suggests potential overpayment exposure of ₹3-7 crores without active QS billing control. A qualified QS with full-time billing control responsibilities costs ₹15-25 lakhs per year in professional fees.

The payback mathematics work even on relatively small projects. What often surprises developers is not just the direct savings but the second-order benefit: contractors who know the PMC has rigorous QS oversight submit more accurate initial bills — reducing dispute resolution time and maintaining better contractor relationships.`
      }
    ],
    keyTakeaways: [
      "23% of analysed invoices contained billing irregularities across ₹340 crores of contractor billings",
      "Measurement inflation (joint measurement required) is the most common category of irregularity",
      "Preliminary cost duplication and specification upgrading account for 28-31% of irregular invoices",
      "Pre-billing independent measurement by QS team is the single most effective billing control",
      "Billing control QS investment delivers 10-20x ROI on typical residential or commercial projects"
    ]
  },
  11: {
    sections: [
      {
        heading: "CPM and PERT: From Theory to Construction Reality",
        body: `CPM (Critical Path Method) and PERT (Program Evaluation and Review Technique) are among the most examined topics in project management certifications — and among the least properly applied in actual construction. The gap between textbook knowledge and field application is where project timelines are won and lost.

The fundamental value of CPM is not in producing a Gantt chart — any spreadsheet can do that. Its value is in identifying the sequence of activities whose duration directly controls the project completion date: the critical path. Activities on the critical path have zero float; any delay to them delays the project end date by exactly the same period.`
      },
      {
        heading: "Building a Credible CPM Schedule",
        body: `A credible CPM schedule for a high-rise residential project begins with activity decomposition: breaking the project scope into discrete, measurable activities with defined deliverables. For a 30-storey tower, this typically produces 400-800 activities at the planning level, with sub-activities for execution-level monitoring.

Activity sequencing must reflect actual site logic — not theoretical construction sequence. For example, MEP rough-in cannot begin until structural slab is poured and cured. But on a racetrack-layout residential floor, a skilled MEP contractor can begin rough-in on the East wing while the West wing slab is still being stripped — if the schedule models this correctly.

Duration estimates must be grounded in productivity data — not optimism. At MANO, we maintain a productivity database from completed projects: crew sizes, output rates per crew-day for every major activity type, adjusted for floor level (height productivity reduces as floors increase). This data makes our duration estimates defensible rather than aspirational.`
      },
      {
        heading: "PERT: Managing Schedule Uncertainty",
        body: `While CPM shows the most likely project duration assuming all activities complete as planned, PERT introduces probabilistic scheduling to quantify the range of possible outcomes. The PERT approach assigns three duration estimates to each activity: optimistic (O), most likely (M), and pessimistic (P). The weighted average — (O + 4M + P) / 6 — forms the expected duration.

The real power of PERT in construction is in identifying which activities carry the highest variance — and therefore the highest risk to the schedule. An activity with expected duration of 45 days but a pessimistic estimate of 90 days warrants a mitigation plan. An activity with expected 45 days and pessimistic 50 days is relatively low-risk.

On our high-rise projects, monsoon season performance is consistently the highest-variance period. Concrete output rates can drop by 40-60% during heavy monsoon phases. Our Monte Carlo simulations for project schedule risk now explicitly model monsoon productivity impacts by modelling historical daily rainfall data from the project location against our productivity database.`
      },
      {
        heading: "Practical Schedule Management in the Field",
        body: `A schedule is only valuable if it is current. Our standard protocol requires schedule updates every two weeks at minimum — with critical activities updated weekly during periods of high schedule pressure.

The update process compares actual progress against the planned baseline, measures float on all near-critical activities (float of less than 10 working days), and triggers a schedule recovery analysis if the project end date slips beyond a defined threshold (typically 3% of total project duration).

Recovery analysis generates options — accelerating critical path activities through overtime, additional crews, or resequencing — and forces an explicit choice on the mitigation approach rather than hoping the schedule recovers on its own. This structured response to delay is what separates projects that recover from those that spiral.`
      }
    ],
    keyTakeaways: [
      "CPM's value is identifying the critical path — the sequence controlling project completion date",
      "Activity durations must be grounded in productivity data, not optimism",
      "PERT probabilistic scheduling identifies which activities carry the highest schedule uncertainty",
      "Monsoon season productivity must be explicitly modelled with historical rainfall data",
      "Schedule updates every 2 weeks with immediate recovery analysis if end date slips beyond 3% threshold"
    ]
  },
  12: {
    sections: [
      {
        heading: "The Hotel Moon Palace: A Project Unlike Any Other",
        body: `When MANO was awarded the project management assignment for Hotel Moon Palace in Kinshasa, the Democratic Republic of Congo, it represented our first international PMC engagement — and a step-change in operational complexity that no domestic project, however large, had fully prepared us for.

The project: a 180-key luxury business hotel with 4 basement levels, 14 upper storeys, conference facilities for 500+ delegates, and a rooftop pool. Construction value: approximately USD 28 million. Timeline: 30 months from foundation to handover. Location: Kinshasa, a city of 17 million people with infrastructure challenges that make Indian tier-2 cities look straightforward.`
      },
      {
        heading: "Cross-Cultural Coordination: The Hidden Complexity",
        body: `The project team on Kinshasa comprised three layers: an Indian PMC team (MANO), a Lebanese main contractor with its own management hierarchy, and Congolese sub-contractors and daily labour. Add to this a client ownership structure with investors from DRC, India, and the Middle East, and you have a coordination challenge that no project management software can resolve on its own.

Language was the first challenge. French is DRC's official language; the Lebanese contractor operated in Arabic internally and French externally; MANO's team communicated in English. Our resolution: all formal project documentation in English (the project contract language), all field communications in French through qualified translators on the MANO team, and weekly cross-cultural briefings to identify emerging miscommunications before they became disputes.

Cultural differences in time orientation — the Lebanese contractor's more relationship-based approach to schedule versus MANO's milestone-precision culture — required explicit negotiation of what "completion" meant for each weekly progress report.`
      },
      {
        heading: "International Procurement: The Logistics Dimension",
        body: `In India, a procurement decision involves vendor selection, price negotiation, and delivery scheduling. In Kinshasa, it involves all of these plus: export clearances from the country of origin, ocean freight booking (Kinshasa is accessible only through Matadi port, 365 km by road from the city), customs clearance through DRC's complex import regime, and inland logistics through a road network with significant capacity constraints.

On the Hotel Moon Palace project, our procurement team managed over 40 international sourcing events across 12 countries. Italian stone for the lobby flooring, German lift equipment, Belgian sanitary ware, Chinese structural steel — each with its own freight timeline, port of origin documentation requirements, and DRC customs classification.

The critical learning: international procurement requires a minimum 50% longer lead time than the most conservative Indian supply chain estimate — and a contingency plan for every high-value item in case of customs delay, damage, or quality rejection at destination.`
      },
      {
        heading: "Remote Site Management: Building the Capability",
        body: `Managing a project 6,500 km from our Mumbai headquarters required investing in systems that we had previously considered optional. Daily video progress reports from every work front (not weekly). Real-time financial tracking shared with the client ownership group across time zones. A dedicated India-based PMC support team that handled documentation, procurement tracking, and dispute resolution research without requiring the Kinshasa team to divert focus from site management.

The experience fundamentally changed how MANO thinks about remote project management. The discipline required for international projects — daily documentation, systematic communication, rigorous procurement tracking — is now embedded in our domestic project protocols. Our Mumbai suburban projects benefit from practices developed on a hotel project in Central Africa.

Hotel Moon Palace opened on schedule and within 4.2% of the sanctioned project budget — a result we're proud of, and one that would not have been achievable without the systems, the team culture, and the lessons we absorbed along the way.`
      }
    ],
    keyTakeaways: [
      "Language and cultural time-orientation differences require explicit negotiation, not assumption",
      "International procurement requires 50%+ longer lead times than the most conservative Indian supply chain estimate",
      "Daily video progress documentation from every work front is essential for remote project management",
      "A dedicated India-based support team allows site teams to focus on execution rather than administration",
      "International project disciplines — daily docs, systematic communication — improve domestic project delivery"
    ]
  }
};

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
const RevealOnScroll = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      {children}
    </div>
  );
};

// ─── Blog Detail Page ─────────────────────────────────────────────────────────
export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const deviceType = useDeviceType();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const post = blogPosts.find(p => p.id === parseInt(id));
  const content = blogContent[parseInt(id)];

  // Related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter(p => p.category === post?.category && p.id !== post?.id)
    .slice(0, 3);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-blue-pattern text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <button onClick={() => navigate(-1)} className="px-6 py-3 bg-blue-600 rounded-full font-semibold hover:bg-blue-500 transition-colors">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const isMobileOrTablet = deviceType === "mobile" || deviceType === "tablet";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-blue-pattern text-white overflow-x-hidden font-sans selection:bg-blue-500/30">

      {/* ── HERO IMAGE ─────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden" style={{ height: isMobileOrTablet ? "55vw" : "50vh", maxHeight: "520px", minHeight: "220px" }}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black" />

      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────────── */}
      <div className={`mx-auto ${isMobileOrTablet ? "px-4 py-8" : "max-w-4xl px-8 py-12"}`}>

        {/* Category & Meta */}
        <RevealOnScroll>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm font-medium mr-2"
            >
              <ArrowLeft size={16} /> Back to Blog
            </button>
            <CategoryBadge category={post.category} />
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><Calendar size={13} />{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-gray-700" />
              <span className="flex items-center gap-1.5"><Clock size={13} />{post.readTime}</span>
            </div>
          </div>
        </RevealOnScroll>

        {/* Title */}
        <RevealOnScroll delay={80}>
          <h1 className={`font-bold text-white leading-tight mb-6 ${isMobileOrTablet ? "text-2xl" : "text-3xl md:text-4xl lg:text-5xl"}`}>
            {post.title}
          </h1>
        </RevealOnScroll>

        {/* Summary */}
        <RevealOnScroll delay={120}>
          <p className={`text-gray-300 leading-relaxed mb-8 border-l-4 border-blue-500 pl-5 ${isMobileOrTablet ? "text-sm" : "text-lg"}`}>
            {post.summary}
          </p>
        </RevealOnScroll>

        {/* Author & Share strip */}
        <RevealOnScroll delay={150}>
          <div className="flex items-center justify-between py-4 border-y border-white/10 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                <User size={18} className="text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{post.author}</p>
                <p className="text-xs text-gray-500">{post.authorRole}</p>
              </div>
            </div>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-blue-500/30 transition-all text-sm"
            >
              {copied ? <><Check size={14} className="text-green-400" /> Copied!</> : <><Share2 size={14} /> Share</>}
            </button>
          </div>
        </RevealOnScroll>

        {/* Article Sections */}
        {content?.sections.map((section, i) => (
          <RevealOnScroll key={i} delay={i * 60}>
            <div className="mb-10">
              <h2 className={`font-bold text-white mb-4 ${isMobileOrTablet ? "text-lg" : "text-2xl"}`}>
                {section.heading}
              </h2>
              <div className={`text-gray-300 leading-relaxed whitespace-pre-line ${isMobileOrTablet ? "text-sm" : "text-base"}`}>
                {section.body.split("\n").map((para, j) => {
                  if (para.trim() === "") return null;
                  // Bold text support **text**
                  const parts = para.split(/(\*\*[^*]+\*\*)/g);
                  return (
                    <p key={j} className="mb-4">
                      {parts.map((part, k) =>
                        part.startsWith("**") && part.endsWith("**")
                          ? <strong key={k} className="text-white font-semibold">{part.slice(2, -2)}</strong>
                          : part
                      )}
                    </p>
                  );
                })}
              </div>
            </div>
          </RevealOnScroll>
        ))}

        {/* Key Takeaways */}
        {content?.keyTakeaways && (
          <RevealOnScroll>
            <div className="mt-10 mb-12 p-6 rounded-2xl bg-blue-600/10 border border-blue-500/20">
              <h3 className={`font-bold text-white mb-4 flex items-center gap-2 ${isMobileOrTablet ? "text-base" : "text-lg"}`}>
                <BookOpen size={18} className="text-blue-400" /> Key Takeaways
              </h3>
              <ul className="space-y-3">
                {content.keyTakeaways.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-600/30 border border-blue-500/30 flex-shrink-0 flex items-center justify-center text-blue-400 text-xs font-bold">{i + 1}</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>
        )}

        {/* Tags */}
        <RevealOnScroll>
          <div className="flex flex-wrap gap-2 mb-12">
            <Tag size={14} className="text-gray-500 mt-1" />
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-gray-400">
                #{tag}
              </span>
            ))}
          </div>
        </RevealOnScroll>

      </div>

      {/* ── RELATED ARTICLES ──────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section className={`border-t border-white/5 bg-white/[0.02] ${isMobileOrTablet ? "px-4 py-10" : "px-8 md:px-16 py-16"}`}>
          <RevealOnScroll>
            <div className={`mx-auto ${isMobileOrTablet ? "" : "max-w-6xl"}`}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-7 bg-blue-500 rounded-full" />
                <h2 className={`font-bold text-white ${isMobileOrTablet ? "text-lg" : "text-2xl"}`}>Related Articles</h2>
              </div>
              <div className={`grid gap-5 ${isMobileOrTablet ? "grid-cols-1" : "grid-cols-1 md:grid-cols-3"}`}>
                {relatedPosts.map(related => (
                  <Link
                    key={related.id}
                    to={`./${related.id}`}
                    className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:border-blue-500/30 hover:to-blue-600/10 transition-all duration-500 overflow-hidden flex flex-col animated-white-border"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img src={related.image} alt={related.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 left-3"><CategoryBadge category={related.category} /></div>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <span className="flex items-center gap-1"><Clock size={11} />{related.readTime}</span>
                      </div>
                      <h3 className="text-sm font-bold text-white leading-snug mb-2 group-hover:text-blue-300 transition-colors line-clamp-2">{related.title}</h3>
                      <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
                        <p className="text-xs text-gray-500">{related.author}</p>
                        <span className="text-blue-400 text-xs font-semibold flex items-center gap-1">Read <ChevronRight size={12} /></span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </section>
      )}

      {/* ── CTA  ──────────────────────────────────────────────────── */}
      <section className={`border-t border-white/5 ${isMobileOrTablet ? "px-4 py-10" : "px-8 md:px-16 py-16"}`}>
        <RevealOnScroll>
          <div className={`mx-auto text-center ${isMobileOrTablet ? "" : "max-w-3xl"}`}>
            <div className={`${isMobileOrTablet ? "p-6" : "p-10 md:p-14"} rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent hover:border-blue-500/30 transition-all duration-500`}>
              <div className={`${isMobileOrTablet ? "w-12 h-12" : "w-16 h-16"} rounded-2xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center mx-auto mb-5`}>
                <BookOpen className={`${isMobileOrTablet ? "w-6 h-6" : "w-8 h-8"} text-blue-400`} />
              </div>
              <h2 className={`font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2 leading-tight mb-4 ${isMobileOrTablet ? "text-2xl" : "text-3xl md:text-4xl"}`}>
                Have a Project in Mind?
              </h2>
              <p className={`text-gray-400 max-w-xl mx-auto mb-7 ${isMobileOrTablet ? "text-sm" : "text-base"}`}>
                Our team of project management experts is ready to help you plan, execute, and deliver with precision.
              </p>
              <div onClick={() => setIsContactOpen(true)}>
                <RainbowButton>
                  <span className={`flex items-center font-semibold px-4 ${isMobileOrTablet ? "text-base" : "text-lg"}`}>
                    Start Your Project <ChevronRight className="ml-2 w-5 h-5" />
                  </span>
                </RainbowButton>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} initialService="General Inquiry" />
    </div>
  );
}
