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

type guideType = {
  id: string;
  text: string;
  subhead: string;
  example?: string;
  styles: string;
};

const guide: guideType[] = [
  {
    id: "guide1",
    subhead: "Pendeta/Penatua",
    text: "Mohon untuk gelar ditulis dengan lengkap.",
    example: "Pdt. Naya",
    styles: "left-0 top-[20%] md:top-[25%] opacity-0 translate-y-5",
  },
  {
    id: "guide2",
    subhead: "Ayat",
    text: "Format input diperhatikan. [NamaBuku] [pasal]:[ayat]",
    example: "Yohanes 3:16, Yohanes 3:16,18, atau Yohanes 3:16-18,22-24",
    styles:
      "right-0 not-md:right-0 top-[40%] md:top-[40%] opacity-0 translate-y-5",
  },
  {
    id: "guide3",
    subhead: "Lagu-lagu",
    text: "Buku lagu yang diterima adalah NKB, PKJ, dan KJ. Diluar itu harus diisi secara manual.",
    styles: "left-0 top-[60%] md:top-[60%] opacity-0 translate-y-5",
  },
  {
    id: "guide4",
    subhead: "Koreksi",
    text: "Mohon untuk liturgi di cek kembali mulai dari ayat, tanggal, dan lagu yang tertera. Bila ada pertanyaan boleh kontak pembuat.",
    styles: "right-0 not-md:left-0 top-[80%] opacity-0 translate-y-5",
  },
];

type formType = {
  id: string;
  field: string;
  placeholder: string;
  types?: string;
  month?: string[];
};

const namaBulan = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const formHead: formType[] = [
  {
    id: "tanggal",
    field: "Tanggal",
    types: "date",
    placeholder: "",
  },
  {
    id: "tema",
    field: "Tema",
    types: "text",
    placeholder: "Tema",
  },
  {
    id: "pendeta",
    field: "Pendeta",
    types: "text",
    placeholder: "Pdt. John",
  },
  {
    id: "penatua",
    field: "Penatua",
    types: "text",
    placeholder: "Pnt. Doe",
  },
];

const formAyat: formType[] = [
  {
    id: "firman",
    field: "Firman",
    types: "text",
    placeholder: "Yohanes 3:16",
  },
  {
    id: "KP",
    field: "Kata Pembuka",
    types: "text",
    placeholder: "Yohanes 3:16",
  },
  {
    id: "BA",
    field: "Berita Anugerah",
    types: "text",
    placeholder: "Yohanes 3:16",
  },
  {
    id: "persembahan",
    field: "Persembahan",
    types: "text",
    placeholder: "Yohanes 3:16",
  },
];

const formLagu: formType[] = [
  {
    id: "1",
    field: "Votum",
    placeholder: 'KJ 40:1-2 "Ajaib Benar Anugerah"',
  },
  {
    id: "2",
    field: "Kata Pembuka",
    placeholder: 'KJ 40:1-2 "Ajaib Benar Anugerah"',
  },
  {
    id: "3",
    field: "Pengakuan Dosa",
    placeholder: 'KJ 40:1-2 "Ajaib Benar Anugerah"',
  },
  {
    id: "4",
    field: "Berita Anugerah",
    placeholder: 'KJ 40:1-2 "Ajaib Benar Anugerah"',
  },
  {
    id: "5",
    field: "Persembahan",
    placeholder: 'KJ 40:1-2 "Ajaib Benar Anugerah"',
  },
  {
    id: "6",
    field: "Pengutusan",
    placeholder: 'KJ 40:1-2 "Ajaib Benar Anugerah"',
  },
];

const formSurat: formType[] = [
  {
    id: "noSur",
    field: "Nomor Surat",
    types: "number",
    placeholder: "Nomor Surat",
  },
  {
    id: "month",
    field: "Bulan Tujuan",
    types: "",
    month: namaBulan,
    placeholder: "Bulan",
  },
  {
    id: "link-liturgi",
    field: "Link Liturgi",
    types: "text",
    placeholder: "Link",
  },
  {
    id: "link-jadwal",
    field: "Link Jadwal Pendeta",
    types: "text",
    placeholder: "Link",
  },
];

const aboutMe = [
  {
    id: "insta",
    name: "nickson.k_",
    img: "insta.svg",
    link: "https://www.instagram.com/nickson.k_",
  },
  {
    id: "github",
    name: "EndlessWay1",
    img: "github.png",
    link: "https://github.com/EndlessWay1",
  },
];

export { navLinks, guide, formAyat, formLagu, formHead, formSurat, aboutMe };
export type { NavType };
