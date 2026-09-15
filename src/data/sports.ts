export type Sport = {
  id: string;
  name: string;
  description: string;
  image: string;
  alt: string;
};

export const sports: Sport[] = [
  {
    id: "mountaineering",
    name: "Mountaineering",
    description:
      "Scale iconic peaks with certified alpine guides who teach rope work, route finding, and high-altitude safety.",
    image:
      "https://images.unsplash.com/photo-1484264883846-eb04404af310?auto=format&fit=crop&w=2000&q=80",
    alt: "Mountaineers hiking a steep rocky alpine ridge with expedition packs",
  },
  {
    id: "scuba-diving",
    name: "Scuba Diving",
    description:
      "Explore reefs and wrecks alongside PADI/SSI pros who refine buoyancy, navigation, and underwater confidence.",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=80",
    alt: "Scuba diver swimming beside a coral reef teeming with yellow fish",
  },
  {
    id: "paragliding",
    name: "Paragliding",
    description:
      "Launch into thermal soaring with instructors who coach launches, turns, and landing technique from day one.",
    image:
      "https://images.unsplash.com/photo-1769963608832-cc25836772e1?auto=format&fit=crop&w=2000&q=80",
    alt: "Paraglider with a yellow and blue wing soaring over forested mountains",
  },
  {
    id: "mountain-biking",
    name: "Mountain Biking",
    description:
      "Rip trails with coaches who dial in bike setup, cornering, and descending skills for every terrain level.",
    image:
      "https://images.unsplash.com/photo-1761225155424-d6bfed504284?auto=format&fit=crop&w=2000&q=80",
    alt: "Mountain biker jumping a dirt trail through a sunlit forest",
  },
  {
    id: "wakeboarding",
    name: "Wakeboarding",
    description:
      "Progress from deep-water starts to aerial tricks with wake pros who film and break down every run.",
    image:
      "https://images.unsplash.com/photo-1666032234128-abc3e45bd1dc?auto=format&fit=crop&w=2000&q=80",
    alt: "Wakeboarder launching into the air above a lake with spray flying",
  },
  {
    id: "skydiving",
    name: "Skydiving",
    description:
      "Train freefall body flight and canopy control with licensed jumpmasters focused on safe progression.",
    image:
      "https://images.unsplash.com/photo-1474623809196-26c1d33457cc?auto=format&fit=crop&w=2000&q=80",
    alt: "Four skydivers freefalling in formation high above the countryside",
  },
  {
    id: "motocross",
    name: "Motocross",
    description:
      "Build throttle control, jumps, and race craft with coaches who know the dirt track inside out.",
    image:
      "https://images.unsplash.com/photo-1517258307935-9764dad5d7de?auto=format&fit=crop&w=2000&q=80",
    alt: "Motocross rider airborne on a dirt bike against a bright cloudy sky",
  },
  {
    id: "kiteboarding",
    name: "Kiteboarding",
    description:
      "Master kite power and board skills with IKO coaches who prioritize wind awareness and water starts.",
    image:
      "https://images.unsplash.com/photo-1768639400733-45d6cead226a?auto=format&fit=crop&w=2000&q=80",
    alt: "Kiteboarder carving across turquoise water under a large blue kite",
  },
  {
    id: "wingsuit-flying",
    name: "Wingsuit Flying",
    description:
      "Advance from BASE/sky foundations into proximity flying with elite wingsuit mentors and safety protocols.",
    image:
      "https://images.unsplash.com/photo-1753010840134-45b2b059a7d5?auto=format&fit=crop&w=2000&q=80",
    alt: "Wingsuit flyer in a blue suit perched on a cliff edge above a mountain valley",
  },
  {
    id: "skateboarding",
    name: "Skateboarding",
    description:
      "Learn street and park fundamentals—or refine technical lines—with coaches who speak skate fluently.",
    image:
      "https://images.unsplash.com/photo-1499083773823-5000fa2b23e4?auto=format&fit=crop&w=2000&q=80",
    alt: "Skateboarder grabbing the board mid-air above a skatepark bowl",
  },
  {
    id: "surfing",
    name: "Surfing",
    description:
      "Read waves, improve paddle fitness, and refine your pop-up with coastal coaches matched to your level.",
    image: "/sports/surfing.jpg",
    alt: "Surfer launching an aerial off a wave in golden-hour spray",
  },
  {
    id: "base-jumping",
    name: "BASE Jumping",
    description:
      "Progress carefully with experienced BASE mentors covering gear, exit technique, and site-specific risk.",
    image:
      "https://images.unsplash.com/photo-1510280781386-572b2438f88b?auto=format&fit=crop&w=2000&q=80",
    alt: "BASE jumper leaping from a cliff silhouette above a mountain valley at sunset",
  },
  {
    id: "snowboarding",
    name: "Snowboarding",
    description:
      "Carve groomers or drop into the backcountry with instructors who coach edge control and terrain park flow.",
    image:
      "https://images.unsplash.com/photo-1739741432363-8f5fa6ef4e7d?auto=format&fit=crop&w=2000&q=80",
    alt: "Snowboarder grabbing the board mid-jump above snowy mountain peaks",
  },
  {
    id: "kayaking",
    name: "Kayaking",
    description:
      "From flatwater fundamentals to whitewater lines, paddle with coaches who prioritize stroke and safety.",
    image: "/sports/kayaking.jpg",
    alt: "Whitewater kayaker paddling hard through churning rapids in a green kayak",
  },
  {
    id: "hang-gliding",
    name: "Hang Gliding",
    description:
      "Feel the ridge lift with hang-gliding instructors who walk you from ground handling to soaring flights.",
    image: "/sports/hang-gliding.jpg",
    alt: "Hang glider with a white and neon green triangular wing banking against a blue sky",
  },
];
