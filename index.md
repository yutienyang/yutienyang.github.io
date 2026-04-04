---
layout: single
title: " "
permalink: /
author_profile: true
---

## Bio
{: #bio }

**Hi!** 
I am an undergraduate student at School of Information Science and Technology, [ShanghaiTech University](https://www.shanghaitech.edu.cn/), focusing on **EDA**, **VLSI** and **Computer Architecture**. My research directions include high-performance, low-power arithmetic circuits and hardware accelerator design. In **[Prof. Xuanle Ren](https://sist.shanghaitech.edu.cn/rxl/main.htm)’s group** at [PMICC](https://pmicc.sist.shanghaitech.edu.cn/), I conduct standard-cell implementations and build design space exploration(**DSE**) workflows for circuit optimization. I have also worked as a **course teaching assistant**, strengthening my ability to communicate and explain technical concepts clearly. Beyond research and teaching, I enjoy hands-on **engineering projects** and have won awards in several competitions.



### Education
- **Sep. 2023 – Present**, ShanghaiTech University, B.Eng. Electronic Engineering 
- **Sep. 2020 - Jun. 2023**, Jianping High School, Shanghai
<!-- - (optional) GPA / advisor / lab / key coursework -->

---

## Experience
{: #experience }

- **Aug. 2025 – Present** — Research Assistant, Prof. Xuanle Ren’s Group, ShanghaiTech University  
- **Feb. 2026 – Present** — Teaching Assistant, *Digital Circuits*, ShanghaiTech University  
- **Sep. 2025 – Jan. 2026** — Teaching Assistant, *Signals and Systems*, ShanghaiTech University  

---

## Publications
<!-- {: #publications } -->
<!-- - **Under Review** — Xuanle Ren†, **Tiantian Yang†**, Qingdian Wan, Qi Meng.  
  *“AXON: An Automated Netlist Optimization Framework for High-Speed Adders,”* submitted to **DAC 2026: The Chips to Systems Conference**.  
  † Co-first authors. -->
**Tiantian Yang**, Xuanle Ren, Qingdian Wan, Qi Meng.  [*“AXON: An Automated Netlist Optimization Framework for High-Speed Adders,”*](https://arxiv.org/pdf/2603.28184) accepted to **ISEDA 2026, Singapore(Oral Presentation)**. 

<!-- - (If none) Selected technical reports / manuscripts. -->
<!-- - Paper/Report title — status, year. [PDF](#) / [Code](#) -->

---

## Awards

{: #awards }

- **Jan. 2026**: Outstanding Teaching Assistant, ShanghaiTech University  
- **Dec. 2025**: Merit Student, ShanghaiTech University (Academic Year 2024–2025)  
- **Aug. 2025**: First Prize, Team Leader, TI Cup National Undergraduate Electronics Design Contest  
- **May 2025**: Third Prize, ShanghaiTech University Electronics Design Contest  
- **Dec. 2024**: Third Prize, China Undergraduate Mathematical Contest in Modeling (CUMCM)  
- **May 2024**: Second Prize, National English Competition for College Students (NECCS)

---

## Projects
{: #projects }

<!-- ### AXON: Automated Adder Netlist Optimization -->
<!-- - What you did (1–2 bullets)
- Key result (delay/area/ADP/EDP)
- [GitHub](#) -->


### Automated Compression-Tree Optimization for High-Speed Multipliers — SPARC LAB, ShanghaiTech University
**Ongoing**


### MAC Unit Multiplier and Adder Optimization — Innostar Semiconductor Co., Ltd.
**Jan.2026 - Mar.2026**
- Worked on joint optimization of multipliers and adders within MAC units for high-performance applications.
- Collaborated with hardware teams to integrate optimized components into final system designs, meeting PPA (Power, Performance, Area) targets.

### Automated Netlist Generater for High-Performance Adders — SPARC LAB, ShanghaiTech University
**Oct.2025 -- Jan.2026**
- Developed an automated framework for **architecture-to-netlist design space exploration (DSE)** for adders, jointly optimizing **prefix topology** and **standard-cell-aware mapping**.
- Implemented a **hierarchical search** strategy to efficiently converge to near-optimal solutions under user-defined PPA constraints.
- Proposed a **ultra-high-speed adder** combining **parallel-prefix** and **hybrid** structures to shorten the critical path.
- Achieved up to **10.3% delay**, **12.6% ADP**, and **32.1% EDP** improvement over commercial synthesis tool baselines using a **TSMC 28nm** standard-cell library.
<p align="center">
  <img src="/images/AXON0.png" alt="AXON Result0" width="810">
</p>
<p align="center">
  <img src="/images/axon.png" alt="AXON Result" width="800">
</p>

### RISC-V Based AI Accelerator for CNN Inference — ShanghaiTech University
**Dec.2025 - Jan.2026 (AI Computing Systems)**
- Co-designed an integer-only CNN inference system on an **RV64I** scalar core augmented with a **512-bit vector processing unit** and operator-specific accelerators.
- Designed and integrated accelerators for key kernels: **im2col**, **convolution**, **pooling**, and **fully-connected** layers; applied fixed-point scaling/ReLU/saturation to match quantized software behavior.
- Built the software operator library in **C + inline assembly** to invoke vector/accelerator instructions; completed end-to-end deployment of Conv/Pool/FC/Softmax pipeline.
- Achieved **103.4×** speedup over scalar baseline; outperformed vector-only implementation by **3.6×**.

### Mixed-Signal Adaptive Filter 
**Jul.2025 - Aug.2025 (Competition Project)**
- Built a circuit model exploration prototype: used **STM32H7** to control an **AD9959 DDS** for programmable stimulus generation, and drove an unknown **device-under-test (DUT)** circuit.
- Designed the analog front-end for signal conditioning and computation; captured DUT outputs via on-chip **ADC** to form a closed-loop measurement pipeline.
- Implemented on-device DSP to learn DUT behavior: performed **FFT-based** analysis to extract magnitude/phase response and inferred transfer function *H(s)* (with filter-type classification).
- Enabled real-time emulation of the DUT by discretizing *H(s)* (deriving *h[n]*) and applying **convolution / digital filtering** to the same input, producing DUT-matched outputs.
<p align="center">
  <img src="/images/adaptive_filter.jpg" alt="Mixed-Signal Adaptive Filter prototype" width="400">
</p>

### TM/TE Mode Cylindrical Microwave Cavity Resonator — ShanghaiTech University
**May 2025 - Jun.2025 (Electromagnetics)**
- Derived resonant frequencies of TM/TE modes via Helmholtz equation and Bessel function analysis.
- Simulated typical eigenmodes using **CST Microwave Studio**.
- Verified field distributions via **eigenmode** and **time-domain** solvers; analyzed *S21* variations across multiple probe positions.
- Built a physical resonator using foam and aluminum foil; conducted **VNA measurements** to match simulated field and frequency profiles.
- Identified error sources including angular misalignment, probe length mismatch, and wall conductivity deviation.
<p align="center">
  <img src="/images/resonater.png" alt="resonater Result" width="500">
</p>
<!-- ### Two-Stage CMOS Operational Amplifier Design — ShanghaiTech University
**Fall 2024 (Analog Circuits Project)**
- Designed a differential-input, single-ended-output **two-stage CMOS op-amp** using **TSMC 0.18 μm** process technology.
- Met key specifications: **ADM ≥ 60 dB**, **Unity-Gain Bandwidth ≥ 100 MHz**, and **1 pF** capacitive load.
- Completed a comprehensive LaTeX report detailing the design, simulation, and testing phases. -->

<!-- bundle exec jekyll serve -l -H localhost -->