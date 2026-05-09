# DongZi 个人网站 Spec (Nothing Design)

## Why
用户需要一个个人网站来展示其作为初中生独立开发者的作品、理念、技能和经历。网站需要采用 Nothing 的设计风格（极简、单色、排版驱动、工业感、暗黑模式），以突出其“产品感”而非“学生作业感”。

## What Changes
- 建立基于 Nothing 设计系统的纯前端静态个人网站。
- 应用 OLED 纯黑（Dark Mode）作为基础主题，搭配白色文本和红色（#D71921）点缀。
- 引入核心字体：Space Grotesk（主标题/正文）、Space Mono（元数据/标签）、Doto（Hero 视觉中心）。
- 构建三大视觉层级：
  - **Primary**: 超大号 Hero 区域（DongZi / 核心身份）。
  - **Secondary**: 项目卡片展示（Numbers-In-Pi, HTML-Shower 等）和主要正文。
  - **Tertiary**: 技能标签、社交链接、状态栏（Space Mono ALL CAPS）。

## Impact
- Affected specs: 个人品牌展示、作品集索引、社交媒体引流。
- Affected code: 项目根目录下的全新前端文件结构（HTML/CSS/JS 或 React/Vite）。

## ADDED Requirements
### Requirement: Typography & Theming (Nothing Design)
The system SHALL provide a strictly monochromatic OLED Dark Mode with specific typography rules.
- **Fonts**: Load Google Fonts (Space Grotesk, Space Mono, Doto).
- **Colors**: Background `#000000`, Text `#FFFFFF` (90%), Metadata `#FFFFFF` (60%), Accent `#D71921`.
- **Spacing**: Use a rigid spacing scale (4, 8, 16, 32, 64, 96px).

### Requirement: Layout Structure
The system SHALL implement the following sections:
1. **Hero Section**:
   - 超大号字体显示 "DONGZI" (Doto 字体)。
   - 紧凑的子标题："INDEPENDENT DEVELOPER // VEX IQ CAPTAIN"。
   - 一个红色的状态点或小方块作为打断元素的视觉焦点。
2. **About Section**:
   - 理念阐述：“做真正能被使用的作品，而不只是完成任务的项目”。
   - 大字号的正文排版，右侧对齐或非对称布局。
3. **Projects Section**:
   - 工业风卡片网格布局（无阴影、无圆角或极小圆角 4px、细边框）。
   - 包含项目名称、链接、单色标签、单色状态指示器。
4. **Skills & Tools Section**:
   - 高信息密度的排版，使用 Space Mono 显示技术栈（前端、AI、设计）。
   - 使用进度条或机械感仪表盘样式展示技能点。
5. **Footer**:
   - 边缘锚定的社交链接（小红书、GitHub），全大写字母。

#### Scenario: Success case
- **WHEN** 用户访问主页
- **THEN** 看到一个极致克制、充满工业感和极简主义的个人名片，动画效果为机械感（click not swoosh），无花哨渐变。
