# 🔥 ansh's portfolio website

> *no cap, this portfolio hits different* ✨

## what's this about? 

yo, this is my personal portfolio website built with react and it's absolutely **sending me** 🚀. it's got all the modern web dev vibes you could ask for - smooth animations, dark mode, responsive design, and some seriously clean ui components.

## ✨ features that go hard

- **🎨 modern ui/ux** - built with shadcn/ui components that are *chef's kiss*
- **🌙 dark/light theme toggle** - because we respect your eyes bestie
- **📱 fully responsive** - looks fire on mobile, tablet, desktop - you name it
- **🎭 smooth animations** - framer-motion doing the heavy lifting fr
- **💀 skeleton loading states** - no more awkward loading screens
- **📧 contact form** - web3forms integration that actually works
- **🎯 hover tooltips** - badge tooltips on navbar elements (we love attention to detail)
- **♾️ smooth scrolling** - lenis scroll for that buttery experience
- **🎪 interactive elements** - bouncing chevron, expandable cards, the whole nine yards

## 🛠️ tech stack (the good stuff)

```json
{
  "frontend": ["react", "vite", "tailwindcss"],
  "ui_library": "shadcn/ui",
  "animations": "framer-motion", 
  "icons": "lucide-react",
  "smooth_scroll": "lenis",
  "forms": "web3forms",
  "styling": "tailwindcss + css modules"
}
```

## 🚀 getting started

```bash
# clone this beauty
git clone <your-repo-url>

# hop into the directory
cd pf

# install the goods
npm install

# fire it up
npm run dev
```

## 📁 project structure (organized chaos)

```
src/
├── components/ui/          # reusable ui components
│   ├── badge.jsx          # badge component
│   ├── button.jsx         # button variants
│   ├── skeleton.jsx       # loading skeletons
│   ├── ProjectCard.jsx    # project showcase cards
│   ├── History.jsx        # timeline component
│   ├── ExperienceUI.jsx   # expandable experience cards
│   └── ...more components
├── App.jsx                # main app component (the star of the show)
├── App.css               # custom styles
└── main.jsx              # entry point
```

## 🎨 key components breakdown

### App.jsx - the main character
- **state management** for loading, alerts, contact form, hover states
- **contact form handling** with web3forms integration
- **smooth scroll setup** with lenis
- **responsive layout** with mobile-first approach
- **motion animations** triggered on scroll

### navbar magic ✨
- floating bottom navbar with social links
- hover badges that appear above each icon
- theme toggle integration
- backdrop blur effects for that premium feel

### sections that slap 📱
- **hero section** - intro with profile pic and smooth animations
- **about** - personal description with proper typography
- **work experience** - expandable cards with company logos
- **education** - timeline format with institution details
- **skills** - interactive badge grid
- **projects** - video previews with live/github links
- **history** - hackathon and achievement timeline
- **contact** - modal form with proper validation

## 🎭 animations & interactions

- **scroll-triggered animations** - blur-to-normal + bottom-to-up effects
- **skeleton loading states** - proper loading placeholders
- **hover effects** - badge tooltips, button states, card interactions
- **bouncing chevron** - stops when contact button is clicked
- **smooth page transitions** - lenis scroll integration

## 🌙 theme system

- **dark mode by default** - because we're not savages
- **theme persistence** - remembers your preference
- **proper contrast** - accessibility first approach
- **smooth transitions** - no jarring theme switches

## 📧 contact form features

- **web3forms integration** - actually sends emails (revolutionary, i know)
- **form validation** - proper error handling
- **success/error alerts** - user feedback that doesn't suck
- **modal dialog** - clean ui that doesn't interrupt the flow

## 🎯 performance optimizations

- **lazy loading** - components load when needed
- **skeleton states** - perceived performance boost
- **optimized images** - lorem picsum for reliable placeholders
- **minimal bundle size** - only import what you need

## 🔧 customization

want to make it yours? here's what to change:

1. **personal info** - update the data arrays in App.jsx
2. **social links** - modify the navbar href attributes
3. **contact form** - add your web3forms access key to .env
4. **styling** - customize the tailwind classes
5. **animations** - tweak the framer-motion configs

## 🚨 environment variables

create a `.env` file:
```
VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
```

## 📱 responsive breakpoints

- **mobile**: < 640px
- **tablet**: 640px - 1024px  
- **desktop**: > 1024px

## 🎪 easter eggs & details

- chevron animation stops when you click contact
- navbar badges appear exactly above each element
- skeleton loading matches real component dimensions
- smooth scroll only triggers animations when scrolling down
- theme toggle is properly wrapped in context

## 🤝 contributing

found a bug? want to add a feature? 
1. fork it
2. create a branch
3. make your changes
4. submit a pr

## 📄 license

MIT - do whatever you want with it bestie

---

*built with ❤️ and way too much caffeine*

**p.s.** - if you use this template, drop me a follow on github. it's free and makes me happy 🥺
