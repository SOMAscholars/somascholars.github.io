/* ============================================================
   CONTENT DATA
   Replace the placeholder entries below with real club content.
   Every image is loaded from picsum.photos / pravatar.cc as a
   stand-in — swap the `img` field for a real file path or URL.
   ============================================================ */

// Each artwork gets a museum-style accession number for the
// "wall label" motif used throughout the site.
function accession(n) {
  return `AWC.26.${String(n).padStart(3, "0")}`;
}

const ARTWORK = [
  { id: 1,  title: "Low Tide",              artist: "Maren Okafor",   medium: "Oil on canvas",        year: 2026, img: "https://picsum.photos/id/1015/1400/1000", w: 1400, h: 1000 },
  { id: 2,  title: "Static Bloom",          artist: "Theo Wren",      medium: "Digital collage",      year: 2025, img: "https://picsum.photos/id/1025/1000/1400", w: 1000, h: 1400 },
  { id: 3,  title: "Interior, Late August", artist: "Priya Anand",    medium: "Gouache",               year: 2026, img: "https://picsum.photos/id/1039/1200/900",  w: 1200, h: 900  },
  { id: 4,  title: "Notes on Rust",         artist: "Yusuf Demir",    medium: "Etching",               year: 2025, img: "https://picsum.photos/id/1043/900/1200",  w: 900,  h: 1200 },
  { id: 5,  title: "Untitled (Sister)",     artist: "Clare Bettencourt", medium: "Silver gelatin print", year: 2026, img: "https://picsum.photos/id/1050/1300/1000", w: 1300, h: 1000 },
  { id: 6,  title: "Field Recording No. 3", artist: "Sam Okonkwo",    medium: "Mixed media",           year: 2025, img: "https://picsum.photos/id/1060/1100/1400", w: 1100, h: 1400 },
  { id: 7,  title: "Yellow House",          artist: "Ines Falk",      medium: "Acrylic on panel",      year: 2026, img: "https://picsum.photos/id/1074/1400/1050", w: 1400, h: 1050 },
  { id: 8,  title: "Marginalia",            artist: "Jonah Kessler",  medium: "Ink on paper",          year: 2024, img: "https://picsum.photos/id/1080/950/1300",  w: 950,  h: 1300 },
  { id: 9,  title: "After the Rain",        artist: "Maren Okafor",   medium: "Watercolor",            year: 2026, img: "https://picsum.photos/id/1084/1300/1300", w: 1300, h: 1300 },
  { id: 10, title: "Concrete Garden",       artist: "Theo Wren",      medium: "Photography",           year: 2025, img: "https://picsum.photos/id/1011/1400/900",  w: 1400, h: 900  },
  { id: 11, title: "Half-Remembered Room",  artist: "Priya Anand",    medium: "Oil on board",          year: 2026, img: "https://picsum.photos/id/1016/1000/1300", w: 1000, h: 1300 },
  { id: 12, title: "Study for a Departure", artist: "Clare Bettencourt", medium: "Charcoal",           year: 2025, img: "https://picsum.photos/id/1021/1200/1500", w: 1200, h: 1500 },
  { id: 13, title: "Small Weather",         artist: "Sam Okonkwo",    medium: "Risograph print",       year: 2026, img: "https://picsum.photos/id/1027/1200/900",  w: 1200, h: 900  },
  { id: 14, title: "The Long Way Home",     artist: "Yusuf Demir",    medium: "Oil on canvas",         year: 2024, img: "https://picsum.photos/id/1033/1400/1000", w: 1400, h: 1000 },
  { id: 15, title: "Nocturne",              artist: "Ines Falk",      medium: "Monoprint",             year: 2026, img: "https://picsum.photos/id/1041/950/1250",  w: 950,  h: 1250 },
  { id: 16, title: "Kitchen, 6AM",          artist: "Jonah Kessler",  medium: "Photography",           year: 2025, img: "https://picsum.photos/id/1048/1300/950",  w: 1300, h: 950  },
].map((a, i) => ({ ...a, accession: accession(i + 1) }));

// Subset featured in the homepage carousel, in curated order.
const FEATURED_IDS = [7, 2, 1, 9, 4, 10, 12, 15];
const CAROUSEL = FEATURED_IDS.map((id) => ARTWORK.find((a) => a.id === id));

const TEAM = [
  { id: 1, name: "Alex Johnson",    role: "President",              medium: "Painter",          img: "https://i.pravatar.cc/600?img=12" },
  { id: 2, name: "Jamie Smith",     role: "Creative Director",      medium: "Sculptor",         img: "https://i.pravatar.cc/600?img=32" },
  { id: 3, name: "Priya Anand",     role: "Gallery Curator",        medium: "Painter",          img: "https://i.pravatar.cc/600?img=45" },
  { id: 4, name: "Theo Wren",       role: "Social Media Lead",      medium: "Photographer",     img: "https://i.pravatar.cc/600?img=51" },
  { id: 5, name: "Clare Bettencourt", role: "Workshop Coordinator", medium: "Printmaker",       img: "https://i.pravatar.cc/600?img=47" },
  { id: 6, name: "Sam Okonkwo",     role: "Treasurer",              medium: "Mixed media",      img: "https://i.pravatar.cc/600?img=14" },
  { id: 7, name: "Ines Falk",       role: "Events Lead",            medium: "Illustrator",      img: "https://i.pravatar.cc/600?img=26" },
  { id: 8, name: "Jonah Kessler",   role: "Publications Editor",    medium: "Writer / Collage",  img: "https://i.pravatar.cc/600?img=15" },
];

// Replace with your real Google Form link.
const SUBMISSION_FORM_URL = "https://forms.google.com/[GOOGLE-FORM-URL]";
