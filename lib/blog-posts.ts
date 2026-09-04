export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  coverImage: {
    src: string;
    alt: string;
  };
  content: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-ghee-still-matters",
    title: "Why Ghee Still Matters in Indian Sweets",
    excerpt:
      "Long before “clean label” became a phrase, Indian kitchens already knew: real ghee makes real mithai.",
    date: "2026-08-20",
    readTime: "3 min read",
    coverImage: {
      src: "/assets/process/process-cooking.jpg",
      alt: "Hands stirring papri mixture in a brass kadhai over a flame",
    },
    content: [
      {
        type: "paragraph",
        text: "Walk through the sweets aisle of most stores today and you'll find a quiet substitution happening in plenty of packaged mithai: vegetable oil or vanaspati standing in for ghee. It's cheaper, it has a longer shelf life, and most people won't notice from the ingredient list alone. But they notice in the eating.",
      },
      {
        type: "heading",
        text: "It's not just about flavour",
      },
      {
        type: "paragraph",
        text: "Ghee does more than taste rich. It carries flavour differently than a neutral oil does, it firms up and softens with temperature in a way that gives mithai its characteristic texture, and it's what lets a sweet hold its shape on a plate without turning greasy or waxy. Swap it out, and you can dial back the cost — but you're also dialing back the reason the sweet tasted like something worth making in the first place.",
      },
      {
        type: "paragraph",
        text: "This isn't a new discovery. It's just what every home kitchen in India already knew before packaged mithai existed at all: you cooked with ghee because that's what made it taste right, full stop.",
      },
      {
        type: "heading",
        text: "Where Nouriqo lands on this",
      },
      {
        type: "paragraph",
        text: "We didn't set out to make a health claim here — we set out to make papri that tastes like it's supposed to. That meant sticking with real desi ghee, real cashews, almonds, and pistachios, and skipping the maida and preservatives that let other packaged sweets sit on a shelf indefinitely. It's less a philosophy than a refusal to take the easier, blander shortcut.",
      },
    ],
  },
  {
    slug: "a-short-guide-to-gifting-mithai",
    title: "A Short Guide to Gifting Mithai",
    excerpt:
      "A box of sweets says something a card can't. Here's how to get the occasion — and the box — right.",
    date: "2026-08-28",
    readTime: "3 min read",
    coverImage: {
      src: "/assets/lifestyle/gifting-box.jpg",
      alt: "Nouriqo papri sweets packed in a decorative green gift box with a gold ribbon",
    },
    content: [
      {
        type: "paragraph",
        text: "Mithai has always done a job that words sometimes can't. It shows up at weddings and housewarmings, after a promotion, before a festival, or simply on a visit to someone's home — not because the occasion demands it, but because a box of something sweet is a small, unmistakable way of saying you were thought of.",
      },
      {
        type: "heading",
        text: "When it's more than a gesture",
      },
      {
        type: "paragraph",
        text: "The bigger the occasion, the more the box itself tends to matter — the ribbon, the presentation, the sense that someone chose this deliberately rather than grabbing whatever was closest to the door. For festivals and weddings especially, gifting mithai that looks considered is its own kind of message.",
      },
      {
        type: "heading",
        text: "A few things worth knowing",
      },
      {
        type: "paragraph",
        text: "If you're gifting to a household rather than an individual, a variety is usually appreciated more than a single large box of one thing — not everyone in a family shares the same favourite. It's also worth asking, gently, about dietary restrictions before you commit to a box; traditional mithai often contains nuts and dairy, which matters more at a large gathering than a one-on-one visit.",
      },
      {
        type: "paragraph",
        text: "And if you're not sure what to choose: a classic, well-made papri or barfi rarely misses. It's familiar enough to feel right for almost any occasion, without needing an explanation.",
      },
    ],
  },
  {
    slug: "papri-explained",
    title: "Papri, Explained",
    excerpt:
      "What exactly is papri, and why does a sweet this simple take so long to get right?",
    date: "2026-09-01",
    readTime: "2 min read",
    coverImage: {
      src: "/assets/products/classic-ghee-papri.jpg",
      alt: "Nouriqo Special Ghee Papri box, Classic Delicious variant, with a bowl of papri sweets topped with almonds and pistachios",
    },
    content: [
      {
        type: "paragraph",
        text: "If you've grown up around Indian sweets, you've almost certainly had papri without necessarily knowing it by that name — it's one of those mithai that varies slightly from kitchen to kitchen and region to region, but is instantly recognisable once you taste it: a dense, slightly granular sweet, rich with ghee, usually finished with a scattering of nuts on top.",
      },
      {
        type: "heading",
        text: "Simple ingredients, unforgiving technique",
      },
      {
        type: "paragraph",
        text: "Part of what makes papri interesting is how little it hides behind. There's no elaborate filling or multi-step assembly — the quality of a papri comes down almost entirely to the ghee, the sugar, and how carefully it's cooked. Rush it, and the texture turns grainy in the wrong way. Undercook it, and it never sets properly. Get it right, and it holds together in a way that feels almost effortless — which is exactly why it isn't.",
      },
      {
        type: "heading",
        text: "Our version",
      },
      {
        type: "paragraph",
        text: "Nouriqo's papri is finished with real almonds, cashews, and pistachios, made with desi ghee, and kept free of maida, artificial colour, and preservatives — the same recipe carried forward since 1958. Nothing about it is reinvented. It didn't need to be.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getSortedPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
