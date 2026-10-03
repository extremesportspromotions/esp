export type Sport = {
  id: string;
  name: string;
  description: string;
  image: string;
  alt: string;
  /** CSS object-position to keep the action centred in the carousel crop */
  imagePosition?: string;
  /** Beginner guide linked from the homepage carousel photo */
  guide: string;
  /** Optional homepage carousel video */
  video?: string;
  /** Optional attribution shown below the carousel media */
  credit?: string;
};

export const sports: Sport[] = [
  {
    id: "mountaineering",
    guide: "/guides/mountaineering-for-beginners-uk",
    video: "/carousel-clips/carousel-01-mountaineering.mp4",
    credit: "Pixabay Content License",
    name: "Mountaineering",
    description:
      "Scale iconic peaks with certified alpine guides who teach rope work, route finding, and high-altitude safety.",
    image: "/sports/mountaineering.jpg",
    alt: "Hiker on a mountain ridge looking out over a cloud inversion",
    imagePosition: "62% 58%",
  },
  {
    id: "scuba-diving",
    guide: "/guides/first-scuba-course",
    video: "/carousel-clips/carousel-02-scuba-diving.mp4",
    name: "Scuba Diving",
    description:
      "Explore reefs and wrecks alongside PADI/SSI pros who refine buoyancy, navigation, and underwater confidence.",
    image: "/sports/scuba-diving.jpg",
    alt: "Scuba diver observing an anemone with clownfish on a coral reef",
    imagePosition: "42% 48%",
  },
  {
    id: "paragliding",
    guide: "/guides/learn-to-paraglide-uk",
    video: "/carousel-clips/carousel-03-paragliding.mp4",
    name: "Paragliding",
    description:
      "Launch into thermal soaring with instructors who coach launches, turns, and landing technique from day one.",
    image: "/sports/paragliding.jpg",
    alt: "Paraglider with a white, cyan and yellow wing over a mountain valley",
    imagePosition: "50% 36%",
  },
  {
    id: "mountain-biking",
    guide: "/guides/learn-to-mountain-bike-uk",
    video: "/carousel-clips/carousel-04-mountain-biking.mp4",
    name: "Mountain Biking",
    description:
      "Rip trails with coaches who dial in bike setup, cornering, and descending skills for every terrain level.",
    image:
      "https://images.unsplash.com/photo-1761225155424-d6bfed504284?auto=format&fit=crop&w=2000&q=80",
    alt: "Mountain biker jumping a dirt trail through a sunlit forest",
  },
  {
    id: "wakeboarding",
    guide: "/guides/wakeboarding-for-beginners-uk",
    video: "/carousel-clips/carousel-05-wakeboarding.mp4",
    name: "Wakeboarding",
    description:
      "Progress from deep-water starts to aerial tricks with wake pros who film and break down every run.",
    image:
      "https://images.unsplash.com/photo-1666032234128-abc3e45bd1dc?auto=format&fit=crop&w=2000&q=80",
    alt: "Wakeboarder launching into the air above a lake with spray flying",
  },
  {
    id: "skydiving",
    guide: "/guides/first-tandem-skydive-uk",
    video: "/carousel-clips/carousel-06-skydiving.mp4",
    credit: "Pigheart, CC BY-SA 4.0",
    name: "Skydiving",
    description:
      "Train freefall body flight and canopy control with licensed jumpmasters focused on safe progression.",
    image:
      "https://images.unsplash.com/photo-1474623809196-26c1d33457cc?auto=format&fit=crop&w=2000&q=80",
    alt: "Four skydivers freefalling in formation high above the countryside",
  },
  {
    id: "motocross",
    guide: "/guides/motocross-for-beginners-uk",
    video: "/carousel-clips/carousel-07-motocross.mp4",
    name: "Motocross",
    description:
      "Build throttle control, jumps, and race craft with coaches who know the dirt track inside out.",
    image:
      "https://images.unsplash.com/photo-1517258307935-9764dad5d7de?auto=format&fit=crop&w=2000&q=80",
    alt: "Motocross rider airborne on a dirt bike against a bright cloudy sky",
  },
  {
    id: "kiteboarding",
    guide: "/guides/kiteboarding-for-beginners-uk",
    video: "/carousel-clips/carousel-08-kiteboarding.mp4",
    name: "Kiteboarding",
    description:
      "Master kite power and board skills with IKO coaches who prioritize wind awareness and water starts.",
    image:
      "https://images.unsplash.com/photo-1768639400733-45d6cead226a?auto=format&fit=crop&w=2000&q=80",
    alt: "Kiteboarder carving across turquoise water under a large blue kite",
  },
  {
    id: "wingsuit-flying",
    guide: "/guides/wingsuit-flying-for-beginners-uk",
    name: "Wingsuit Flying",
    description:
      "Advance from BASE/sky foundations into proximity flying with elite wingsuit mentors and safety protocols.",
    image:
      "https://images.unsplash.com/photo-1753010840134-45b2b059a7d5?auto=format&fit=crop&w=2000&q=80",
    alt: "Wingsuit flyer in a blue suit perched on a cliff edge above a mountain valley",
  },
  {
    id: "skateboarding",
    guide: "/guides/skateboarding-for-beginners-uk",
    video: "/carousel-clips/carousel-10-skateboarding.mp4",
    name: "Skateboarding",
    description:
      "Learn street and park fundamentals—or refine technical lines—with coaches who speak skate fluently.",
    image: "/sports/skateboarding.jpg",
    alt: "Skateboarder mid-air grab at a skatepark against a sunset sky",
    imagePosition: "50% 32%",
  },
  {
    id: "surfing",
    guide: "/guides/surfing-for-beginners-uk",
    video: "/carousel-clips/carousel-11-surfing.mp4",
    name: "Surfing",
    description:
      "Read waves, improve paddle fitness, and refine your pop-up with coastal coaches matched to your level.",
    image: "/sports/surfing.jpg",
    alt: "Surfer launching an aerial off a wave in golden-hour spray",
    imagePosition: "50% 36%",
  },
  {
    id: "base-jumping",
    guide: "/guides/base-jumping-for-beginners-uk",
    video: "/carousel-clips/carousel-12-base-jumping.mp4",
    credit: "Quest Films, CC BY 3.0",
    name: "BASE Jumping",
    description:
      "Progress carefully with experienced BASE mentors covering gear, exit technique, and site-specific risk.",
    image: "/sports/base-jumping.jpg",
    alt: "Two BASE jumpers falling from a cliff above a deep fjord",
    imagePosition: "62% 36%",
  },
  {
    id: "snowboarding",
    guide: "/guides/beginners-guide-to-snowboarding-uk",
    video: "/carousel-clips/carousel-13-snowboarding.mp4",
    name: "Snowboarding",
    description:
      "Carve groomers or drop into the backcountry with instructors who coach edge control and terrain park flow.",
    image: "/sports/snowboarding.jpg",
    alt: "Snowboarder in black kit carving hard with powder spray",
    imagePosition: "48% 55%",
  },
  {
    id: "kayaking",
    guide: "/guides/kayaking-for-beginners-uk",
    video: "/carousel-clips/carousel-14-kayaking.mp4",
    name: "Kayaking",
    description:
      "From flatwater fundamentals to whitewater lines, paddle with coaches who prioritize stroke and safety.",
    image: "/sports/kayaking.jpg",
    alt: "POV of orange kayaks paddling a tree-lined waterway",
    imagePosition: "50% 42%",
  },
  {
    id: "hang-gliding",
    guide: "/guides/hang-gliding-for-beginners-uk",
    video: "/carousel-clips/carousel-15-hang-gliding.mp4",
    credit: "TamaMer, CC BY-SA 3.0",
    name: "Hang Gliding",
    description:
      "Feel the ridge lift with hang-gliding instructors who walk you from ground handling to soaring flights.",
    image: "/sports/hang-gliding.jpg",
    alt: "Hang glider with a white wing and orange-red leading edge against a clear blue sky",
    imagePosition: "50% 45%",
  },
];
