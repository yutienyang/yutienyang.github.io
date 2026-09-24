---
layout: single
title: " "
permalink: /
author_profile: true
---

## Bio
{: #bio }

Tiantian Yang is now an undergraduate student at the School of Information Science and Technology, [ShanghaiTech University](https://www.shanghaitech.edu.cn/). His research interests include **VLSI design & automation** and **computer architecture**. Currently, he is a research assistant in Prof. Xuanle Ren’s group at the [Post-Moore Microelectronics and Integrated Circuit Center](https://pmicc.sist.shanghaitech.edu.cn/). He has also served as a **teaching assistant** for several core courses. In the coming year, Tiantian will join the **Shanghai Institute of Semiconductor Innovation** as a doctoral student in integrated circuit engineering, with the goal of developing chips with real-world industrial impact.



### Education
- **Sep. 2027 – Aug. 2031** *(Expected)*, **D.Eng. in Electronic Information Engineering**<br>
  *Shanghai Institute of Semiconductor Innovation (**SISI**)*<br>
  *School of Information Science and Technology (**SIST**)*, *ShanghaiTech University*
- **Sep. 2023 – Jul. 2027** *(Expected)*, B.Eng. Electronic Information Engineering<br>
  *School of Information Science and Technology (**SIST**)*, *ShanghaiTech University*
- **Sep. 2020 - Jul. 2023**, Jianping High School, Shanghai
<!-- - (optional) GPA / advisor / lab / key coursework -->

---

## Experience
{: #experience }

- **Aug. 2025 – Present** — Research Assistant, Prof. Xuanle Ren’s Group, ShanghaiTech University  
- **Feb. 2026 – Jun. 2026** — Teaching Assistant, *Digital Circuits*, ShanghaiTech University  
- **Sep. 2025 – Jan. 2026** — Teaching Assistant, *Signals and Systems*, ShanghaiTech University  

---

## Publications
<!-- {: #publications } -->
<!-- - **Under Review** — Xuanle Ren†, **Tiantian Yang†**, Qingdian Wan, Qi Meng.  
  *“AXON: An Automated Netlist Optimization Framework for High-Speed Adders,”* submitted to **DAC 2026: The Chips to Systems Conference**.  
  † Co-first authors. -->
**Tiantian Yang**, Xuanle Ren, Qingdian Wan, Qi Meng.  **AXON: An Automated Netlist Optimization Framework for High-Speed Adders**, accepted to **ISEDA 2026, Singapore (Oral Presentation)**.  
[Paper](https://arxiv.org/pdf/2603.28184) / [Presentation Slides](/files/ISEDA%2726-Presentation-AXON-Revised.pdf)
<p align="center">
  <img src="/images/pre1_ISEDA2026.jpg" alt="Present at ISEDA2026, Marina Bay Sands" width="400">
</p>
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



### Back-end Resource Evaluation for a Homomorphic Encryption Accelerator based on Monolithic 3D Integration — ShanghaiTech University & Shanghai Jiao Tong University
**Jun.2026 - Jul.2026**

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
