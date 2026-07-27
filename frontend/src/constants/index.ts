type NavType = {
  id: string;
  dst: string;
  name: string;
};

const navLinks: NavType[] = [
  { id: "home", dst: "/", name: "Home" },
  { id: "liturgi", dst: "/liturgi", name: "Liturgi" },
  { id: "surat", dst: "/surat", name: "Surat Pdt" },
  { id: "about", dst: "/About", name: "About Us" },
];

export { navLinks };  export type { NavType };

