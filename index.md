---
layout: single
title: " "
permalink: /
author_profile: true
---

## Home
{: #home }

**Hi!** 
I am an undergraduate student at ShanghaiTech University (School of Information Science and Technology), focusing on **EDA** and **VLSI**. My research interests include high-performance, low-power arithmetic circuits and hardware accelerator design. In **Prof. Xuanle Ren’s group** at PMICC, I conduct standard-cell implementations and build design space exploration(**DSE**) workflows for circuit optimization. I have also worked as a **course teaching assistant**, strengthening my ability to communicate and explain technical concepts clearly. Beyond research, I enjoy hands-on **engineering projects** and have won awards in several competitions.



### Education
- **ShanghaiTech University**, B.Eng. Electronic Engineering (2023–present)
- **Jianping High School, Shanghai** (2020–2023)
<!-- - (optional) GPA / advisor / lab / key coursework -->

---

## Experience
{: #experience }

- **2025.8 – Present** — Research Assistant, Prof. Xuanle Ren’s Group, ShanghaiTech University  
- **2026.2 – Present** — Teaching Assistant, *Digital Circuits*, ShanghaiTech University  
- **2025.9 – 2026.1**  — Teaching Assistant, *Signals and Systems*, ShanghaiTech University  

---

## Publications
<!-- {: #publications } -->
<!-- - **Under Review** — Xuanle Ren†, **Tiantian Yang†**, Qingdian Wan, Qi Meng.  
  *“AXON: An Automated Netlist Optimization Framework for High-Speed Adders,”* submitted to **DAC 2026: The Chips to Systems Conference**.  
  † Co-first authors. -->
  - **Under Review** — submitted to **DAC 2026: The Chips to Systems Conference** as co-first author.  

<!-- - (If none) Selected technical reports / manuscripts. -->
<!-- - Paper/Report title — status, year. [PDF](#) / [Code](#) -->

---

## Awards
{: #awards }
- **2026.1**: *Outstanding Teaching Assistant*, ShanghaiTech University 
- **2025.12**: 'Merit Student' of ShanghaiTech University(Academic Year 2024–2025)  
- **2025.8**: First Prize, Team Leader, TI Cup National Undergraduate Electronics Design Contest  
- **2025.5**: Third Prize, ShanghaiTech University Electronics Design Contest
- **2024.12**: Third Prize, China Undergraduate Mathematical Contest in Modeling (CUMCM)  
- **2024.5**: Second Prize, National English Competition for College Students (NECCS)


---

## Projects
{: #projects }

<!-- ### AXON: Automated Adder Netlist Optimization -->
<!-- - What you did (1–2 bullets)
- Key result (delay/area/ADP/EDP)
- [GitHub](#) -->



### MAC Unit Multiplier and Adder Optimization — Innostar Semiconductor Co., Ltd.
**Ongoing**
- Worked on joint optimization of multipliers and adders within MAC units for high-performance applications.
- Collaborated with hardware teams to integrate optimized components into final system designs, meeting PPA (Power, Performance, Area) targets.

### Automated Netlist Generater for High-Performance Adders — SPARC LAB, ShanghaiTech University
**Fall 2025 (Research Project)**
- Developed an automated framework for **architecture-to-netlist design space exploration (DSE)** for adders, jointly optimizing **prefix topology** and **standard-cell-aware mapping**.
- Implemented a **hierarchical search** strategy to efficiently converge to near-optimal solutions under user-defined PPA constraints.
- Proposed a **ultra-high-speed adder** combining **parallel-prefix** and **hybrid** structures to shorten the critical path.
- Achieved up to **10.3% delay**, **12.6% ADP**, and **32.1% EDP** improvement over commercial synthesis tool baselines using a **TSMC 28nm** standard-cell library.
<p align="center">
  <img src="/images/axon.png" alt="AXON Result" width="600">
</p>
### RISC-V Based AI Accelerator for CNN Inference — ShanghaiTech University
**Fall 2025 (Course Project: AI Computing Systems)**
- Co-designed an integer-only CNN inference system on an **RV64I** scalar core augmented with a **512-bit vector processing unit** and operator-specific accelerators.
- Designed and integrated accelerators for key kernels: **im2col**, **convolution**, **pooling**, and **fully-connected** layers; applied fixed-point scaling/ReLU/saturation to match quantized software behavior.
- Built the software operator library in **C + inline assembly** to invoke vector/accelerator instructions; completed end-to-end deployment of Conv/Pool/FC/Softmax pipeline.
- Achieved **103.4×** speedup over scalar baseline; outperformed vector-only implementation by **3.6×**.

### Mixed-Signal Adaptive Filter — Competition Project
**Summer 2025**
- Built a circuit model exploration prototype: used **STM32H7** to control an **AD9959 DDS** for programmable stimulus generation, and drove an unknown **device-under-test (DUT)** circuit.
- Designed the analog front-end for signal conditioning and computation; captured DUT outputs via on-chip **ADC** to form a closed-loop measurement pipeline.
- Implemented on-device DSP to learn DUT behavior: performed **FFT-based** analysis to extract magnitude/phase response and inferred transfer function *H(s)* (with filter-type classification).
- Enabled real-time emulation of the DUT by discretizing *H(s)* (deriving *h[n]*) and applying **convolution / digital filtering** to the same input, producing DUT-matched outputs.
<p align="center">
  <img src="/images/adaptive_filter.jpg" alt="Mixed-Signal Adaptive Filter prototype" width="400">
</p>

### TM/TE Mode Cylindrical Microwave Cavity Resonator — ShanghaiTech University
**Spring 2025 (Electromagnetics Course Project)**
- Derived resonant frequencies of TM/TE modes via Helmholtz equation and Bessel function analysis.
- Simulated typical eigenmodes using **CST Microwave Studio**.
- Verified field distributions via **eigenmode** and **time-domain** solvers; analyzed *S21* variations across multiple probe positions.
- Built a physical resonator using foam and aluminum foil; conducted **VNA measurements** to match simulated field and frequency profiles.
- Identified error sources including angular misalignment, probe length mismatch, and wall conductivity deviation.
<p align="center">
  <img src="/images/resonater.png" alt="resonater Result" width="500">
</p>
### Two-Stage CMOS Operational Amplifier Design — ShanghaiTech University
**Fall 2024 (Analog Circuits Project)**
- Designed a differential-input, single-ended-output **two-stage CMOS op-amp** using **TSMC 0.18 μm** process technology.
- Met key specifications: **ADM ≥ 60 dB**, **Unity-Gain Bandwidth ≥ 100 MHz**, and **1 pF** capacitive load.
- Completed a comprehensive LaTeX report detailing the design, simulation, and testing phases.