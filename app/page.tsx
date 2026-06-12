"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Volume2,
  ArrowRight,
  Play,
  Cpu,
  TerminalSquare,
  MonitorCheck,
  CheckCircle2,
  Zap,
  X,
  Languages,
  ShieldAlert,
  Layers,
  HelpCircle,
  StopCircle,
  Pause,
  Gauge,
} from "lucide-react";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"hardware" | "software" | "usage">(
    "software",
  );
  const [openedBook, setOpenedBook] = useState<any | null>(null);
  const [translatedItems, setTranslatedItems] = useState<number[]>([]);
  const [isModalTranslated, setIsModalTranslated] = useState<boolean>(false);

  // --- AUDIO STATES ---
  const [speechRate, setSpeechRate] = useState<number>(0.7); // Default lambat 0.7x
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentText, setCurrentText] = useState<string>("");
  const [currentPlayingId, setCurrentPlayingId] = useState<number | null>(null);
  const [currentLang, setCurrentLang] = useState<string>("en-US");

  // Matikan suara otomatis jika pengguna berpindah tab materi atau menutup modal buku
  useEffect(() => {
    stopAudio();
  }, [activeTab, openedBook]);

  // Fungsi Utama Pemutar Audio (Mendukung Play & Resume)
  const handleListenClick = (
    id: number,
    text: string,
    lang: string = "en-US",
  ) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Text-to-speech tidak didukung di browser ini.");
      return;
    }

    const synth = window.speechSynthesis;

    // Kasus 1: Jika mengklik tombol kartu yang sama saat audio sedang berjalan atau di-pause
    if (currentPlayingId === id) {
      if (synth.paused) {
        synth.resume();
        setIsPaused(false);
      } else if (synth.speaking) {
        synth.pause();
        setIsPaused(true);
      }
      return;
    }

    // Kasus 2: Memulai audio baru (atau berpindah kartu)
    // FIX BROWSER BUG: Jika di-cancel saat sedang pause, browser akan stuck.
    // Solusinya: Kita harus resume secara paksa sebelum melakukan cancel.
    if (synth.speaking || synth.paused) {
      synth.resume();
      synth.cancel();
    }

    // Beri jeda 100ms agar browser benar-benar selesai menghapus antrean audio lama
    setTimeout(() => {
      setCurrentPlayingId(id);
      setCurrentText(text);
      setCurrentLang(lang);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = speechRate;

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsPaused(false);
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentPlayingId(null);
      };

      utterance.onerror = (e) => {
        // Jangan reset state UI jika error-nya karena kita sengaja membatalkan (cancel) audionya
        if (e.error !== "canceled" && e.error !== "interrupted") {
          setIsPlaying(false);
          setIsPaused(false);
          setCurrentPlayingId(null);
        }
      };

      synth.speak(utterance);
    }, 100);
  };

  // Fungsi Toggle Pause/Resume untuk Panel Kontrol Utama (FIX ERROR)
  const togglePauseAudio = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;

    if (synth.paused) {
      synth.resume();
      setIsPaused(false);
    } else if (synth.speaking) {
      synth.pause();
      setIsPaused(true);
    }
  };

  // Fungsi Menghentikan Suara Total
  const stopAudio = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const synth = window.speechSynthesis;
      // Sama seperti di atas, cegah stuck dengan meresume sebelum cancel
      if (synth.paused) {
        synth.resume();
      }
      synth.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentPlayingId(null);
    }
  };

  // Fungsi Mengubah Kecepatan Suara Real-time
  const changeSpeed = (newRate: number) => {
    setSpeechRate(newRate);
    // Jika ada audio yang sedang berputar, ulangi instan dengan kecepatan baru
    if (isPlaying && currentPlayingId !== null && currentText) {
      const savedId = currentPlayingId;
      const savedText = currentText;
      const savedLang = currentLang;
      stopAudio();
      setTimeout(() => {
        handleListenClick(savedId, savedText, savedLang);
      }, 50);
    }
  };

  const toggleTranslation = (id: number) => {
    if (translatedItems.includes(id)) {
      setTranslatedItems(translatedItems.filter((itemId) => itemId !== id));
    } else {
      setTranslatedItems([...translatedItems, id]);
    }
  };

  // Data Pembelajaran Berdasarkan Berkas Pendukung Dokumen
  const learningData = {
    hardware: [
      {
        id: 11,
        term: "Input Devices",
        phonetic: "/ˈɪn.pʊt dɪˈvaɪsɪz/",
        definition: {
          en: "Physical components used to provide data and control signals to a computer system based on Patterson & Hennessy's literature.",
          id: "Komponen fisik yang digunakan untuk menyediakan data dan sinyal kontrol ke sistem komputer berdasarkan literatur Patterson & Hennessy.",
        },
        context: {
          en: "The user types a secure command using the keyboard, which acts as the primary input device for the terminal.",
          id: "Pengguna mengetik perintah aman menggunakan keyboard, yang bertindak sebagai perangkat input utama untuk terminal.",
        },
        note: {
          en: "Input tools like keyboards and mice form the physical manifestations bridging human interaction with processor hardware.",
          id: "Alat input seperti keyboard dan mouse membentuk manifestasi fisik yang menjembatani interaksi manusia dengan perangkat keras prosesor.",
        },
        examples: ["Keyboard", "Mouse", "Scanner"],
        source: "Patterson & Hennessy Literature",
      },
      {
        id: 12,
        term: "Output Devices",
        phonetic: "/ˈaʊt.pʊt dɪˈvaɪsɪz/",
        definition: {
          en: "Hardware instruments belonging to the classical computer pillars that convey processing results directly to the user.",
          id: "Instrumen perangkat keras yang termasuk dalam pilar komputer klasik untuk menyampaikan hasil pemrosesan langsung ke pengguna.",
        },
        context: {
          en: "The graphics engine streams the rendered 3D frames straight to the monitor output device for the user to view.",
          id: "Mesin grafis mengalirkan bingkai 3D yang dirender langsung ke perangkat output monitor untuk dilihat pengguna.",
        },
        note: {
          en: "Screens, monitors, and printers are key components that visually or physically express processed digital metrics.",
          id: "Layar, monitor, dan printer adalah komponen kunci yang mengekspresikan metrik digital yang diproses secara visual atau fisik.",
        },
        examples: ["Screen / Monitor", "Speaker", "Printer"],
        source: "5 Main Classical Components",
      },
      {
        id: 13,
        term: "Memory",
        phonetic: "/ˈmem.ər.i/",
        definition: {
          en: "A dedicated internal workspace storage area used to hold active program instructions and immediate computational data.",
          id: "Area penyimpanan ruang kerja internal khusus yang digunakan untuk menyimpan instruksi program aktif dan data komputasi langsung.",
        },
        context: {
          en: "If your computer is lagging while running multiple heavy applications, expanding your volatile memory might prevent system bottlenecks.",
          id: "Jika komputer Anda lambat saat menjalankan beberapa aplikasi berat, memperluas memori volatil dapat mencegah bottleneck sistem.",
        },
        note: {
          en: "Memory acts as volatile storage that feeds raw instruction streams instantly to the arithmetic logic units.",
          id: "Memori bertindak sebagai penyimpanan volatil yang menyuplai aliran instruksi mentah secara instan ke unit logika aritmatika.",
        },
        examples: ["RAM", "Cache Memory", "ROM"],
        source: "5 Main Classical Components",
      },
      {
        id: 14,
        term: "Processor (CPU)",
        phonetic: "/ˈprəʊ.ses.ər/",
        definition: {
          en: "The primary computational engine containing Datapath and Control units to execute commands and coordinate system resources.",
          id: "Mesin komputasi utama yang berisi unit Datapath dan Control untuk mengeksekusi perintah dan mengoordinasikan sumber daya sistem.",
        },
        context: {
          en: "The newly optimized processor manages complex database operations efficiently by utilizing its structural control and datapath pipeline.",
          id: "Prosesor yang baru dioptimalkan mengelola operasi database yang kompleks secara efisien dengan memanfaatkan kontrol struktural dan jalur datapath-nya.",
        },
        note: {
          en: "The Datapath performs arithmetic operations while Control instructs memory, I/O, and the datapath according to the program.",
          id: "Datapath melakukan operasi aritmatika sementara Control menginstruksikan memori, I/O, dan datapath sesuai dengan program.",
        },
        examples: ["Datapath Unit", "Control Unit", "Intel / AMD CPU"],
        source: "TechVocab Architecture Notes",
      },
    ],
    software: [
      {
        id: 21,
        term: "Software System (OS)",
        phonetic: "/ˈsɒft.weər ˈsɪs.təm/",
        definition: {
          en: "Core electronic data and background software that independently manages physical hardware components and fundamental OS baselines.",
          id: "Data elektronik inti dan perangkat lunak latar belakang yang secara independen mengelola komponen perangkat keras fisik dan dasar-dasar OS fundamental.",
        },
        context: {
          en: "Windows, macOS, and Linux are popular software systems that initialize instantly when the computer hardware is powered on.",
          id: "Windows, macOS, dan Linux adalah sistem perangkat lunak populer yang langsung melakukan inisialisasi saat perangkat keras komputer dinyalakan.",
        },
        note: {
          en: "System software runs automatically in the background and is deployed natively during the primary operating system installation.",
          id: "Perangkat lunak sistem berjalan secara otomatis di latar belakang dan diterapkan secara bawaan selama instalasi sistem operasi utama.",
        },
        examples: ["Windows", "Linux", "macOS"],
        source: "Software Classification Standards",
      },
      {
        id: 22,
        term: "Application Software",
        phonetic: "/ˌæp.lɪˈkeɪ.ʃən ˈsɒft.weər/",
        definition: {
          en: "User-targeted programmatic structures tailored specifically for running non-isolated individual assignments and tasks.",
          id: "Struktur program yang ditargetkan untuk pengguna yang disesuaikan secara khusus untuk menjalankan tugas dan penugasan individu yang tidak terisolasi.",
        },
        context: {
          en: "The development team utilized dedicated application software to build the technical vocabulary presentation documents.",
          id: "Tim pengembangan menggunakan perangkat lunak aplikasi khusus untuk membuat dokumen presentasi kosakata teknis.",
        },
        note: {
          en: "Unlike core system environments, application software requires constant, direct human interaction and fully relies on the OS platform.",
          id: "Berbeda dengan lingkungan sistem inti, perangkat lunak aplikasi memerlukan interaksi manusia secara langsung dan konstan serta sepenuhnya bergantung pada platform OS.",
        },
        examples: ["Zoom Meet", "WhatsApp", "MS Office"],
        source: "Software Classification Standards",
      },
      {
        id: 23,
        term: "Utility Software",
        phonetic: "/juːˈtɪl.ə.ti ˈsɒft.weər/",
        definition: {
          en: "System maintenance software engineered to analyze, configure, optimize, and guard computer configurations against errors.",
          id: "Perangkat lunak pemeliharaan sistem yang dirancang untuk menganalisis, mengonfigurasi, mengoptimalkan, dan menjaga konfigurasi komputer dari kesalahan.",
        },
        context: {
          en: "Running utility software regularly ensures that local storage registries remain secure and clean from structural corruption.",
          id: "Menjalankan perangkat lunak utilitas secara teratur memastikan bahwa registri penyimpanan lokal tetap aman dan bersih dari kerusakan estrutural.",
        },
        note: {
          en: "Critical defensive tools like real-time cloud antivirus packages and disk backup compression programs fall into this classification.",
          id: "Alat pertahanan kritis seperti paket antivirus cloud real-time dan program kompresi cadangan disk termasuk dalam klasifikasi ini.",
        },
        examples: ["Avast Antivirus", "CCleaner", "WinRAR"],
        source: "System Maintenance Literature",
      },
      {
        id: 24,
        term: "Software Licensing",
        phonetic: "/ˈlaɪ.sənsɪŋ/",
        definition: {
          en: "The legal distribution framework governing source code transparency, cost parameters, and user modification rights.",
          id: "Kerangka kerja distribusi legal yang mengatur transparansi kode sumber, parameter biaya, dan hak modifikasi pengguna.",
        },
        context: {
          en: "The corporate enterprise purchased a commercial license to protect its architectural databases from copyright enforcement queries.",
          id: "Perusahaan korporat membeli lisensi komersial untuk melindungi database arsitekturalnya dari pertanyaan penegakan hak cipta.",
        },
        note: {
          en: "Licensing spans across Open Source (open code), Freeware (free/closed code), Commercial (paid), and Shareware (trial configurations).",
          id: "Licensing mencakup Open Source (kode terbuka), Freeware (gratis/kode tertutup), Komersial (berbayar), dan Shareware (konfigurasi uji coba).",
        },
        examples: ["Open Source", "Freeware", "Commercial", "Shareware"],
        source: "Legal Software Standards",
      },
    ],
    usage: [
      {
        id: 31,
        term: "Computer Usage",
        phonetic: "/kəmˈpjuː.tər ˈjuː.sɪdʒ/",
        definition: {
          en: "The systematic operational practice of employing both system hardware and software components to process and manage tasks.",
          id: "Praktik operasional sistematis dalam menggunakan komponen perangkat keras dan perangkat lunak sistem untuk memproses dan mengelola tugas.",
        },
        context: {
          en: "Establishing secure and clear guidelines regarding professional computer usage significantly reduces cyber security exploits.",
          id: "Menetapkan pedoman yang aman dan jelas mengenai penggunaan komputer profesional secara signifikan mengurangi celah keamanan siber.",
        },
        note: {
          en: "Productive computer usage demands a foundational literacy of how operating systems interpret local physical datapath queries.",
          id: "Penggunaan komputer yang produktif menuntut literasi dasar tentang bagaimana sistem operasi menginterpretasikan kueri jalur data fisik lokal.",
        },
        examples: ["Data Processing", "Cloud File Storing", "Task Management"],
        source: "IT Literacy Basics",
      },
      {
        id: 32,
        term: "Disk Cleanup",
        phonetic: "/dɪsk ˈkliːn.ʌp/",
        definition: {
          en: "A diagnostic maintenance utility protocol used to wipe unneeded temporary files and reclaim digital storage blocks.",
          id: "Protokol utilitas pemeliharaan diagnostik yang digunakan untuk menghapus file sementara yang tidak diperlukan dan memulihkan blok penyimpanan digital.",
        },
        context: {
          en: "In Windows, you can actively invoke the Disk Cleanup wizard to instantly sweep junk data configurations from memory paths.",
          id: "Di Windows, Anda dapat secara aktif memanggil wizard Disk Cleanup untuk menyapu konfigurasi data sampah secara instan dari jalur memori.",
        },
        note: {
          en: "Executing standard disk cleanup sweeps prevents system slowdowns triggered by excessively cluttered system cache paths.",
          id: "Menjalankan sapuan pembersihan disk standar mencegah pelambatan sistem yang dipicu oleh jalur cache sistem yang terlalu penuh.",
        },
        examples: [
          "Cache Purging",
          "Temporary Log Wipe",
          "Recycle Bin Clearing",
        ],
        source: "Computer Maintenance Tips",
      },
      {
        id: 33,
        term: "Antivirus Security",
        phonetic: "/ˌæn.tiˈvaɪ.rəs sɪˈkjʊə.rə.ti/",
        definition: {
          en: "The implementation of protective background scanners engineered to trap, isolate, and neutralize destructive malware exploits.",
          id: "Penerapan pemindai latar belakang pelindung yang dirancang untuk menjebak, mengisolasi, dan menetralisir eksploitasi malware yang merusak.",
        },
        context: {
          en: "Always deploy a verified antivirus program and run scheduling loops regularly to eliminate digital infections early.",
          id: "Selalu pasang program antivirus terverifikasi dan jalankan perulangan jadwal secara teratur untuk mengeliminasi infeksi digital sejak dini.",
        },
        note: {
          en: "Frequent viral database registry definitions updates are required to fortify utility defenses against modern web vulnerabilities.",
          id: "Pembaruan definisi registri database virus yang sering diperlukan untuk memperkuat pertahanan utilitas terhadap kerentanan web modern.",
        },
        examples: ["Real-time Scan", "Malware Isolation", "Threat Quarantine"],
        source: "Computer Maintenance Tips",
      },
      {
        id: 34,
        term: "Data Backup",
        phonetic: "/ˈdeɪ.tə ˈbæk.ʌp/",
        definition: {
          en: "The critical safety method of mirroring system documentation blocks into external parameters to mitigate data loss.",
          id: "Metode keselamatan kritis untuk mencerminkan blok dokumentasi sistem ke dalam parameter eksternal untuk memitigasi kehilangan data.",
        },
        context: {
          en: "The network engineer verified that the automated nightly cloud data backup executed perfectly across the main offsite targets.",
          id: "Teknisi jaringan memverifikasi bahwa pencadangan data cloud otomatis setiap malam dieksekusi dengan sempurna di seluruh target luar lokasi utama.",
        },
        note: {
          en: "Utilizing external hard drives or redundant network cloud structures ensures business continuity during unexpected terminal crashes.",
          id: "Memanfaatkan hard drive eksternal atau struktur cloud jaringan redundan memastikan kontinuitas bisnis selama kerusakan terminal yang tidak terduga.",
        },
        examples: ["Google Drive", "Dropbox", "External Hard Drive Storage"],
        source: "Computer Maintenance Tips",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-300 font-sans selection:bg-purple-500/30">
      <main>
        {/* --- HERO SECTION --- */}
        <section className="pt-24 pb-20 px-6 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            Interactive Learning Application
          </div>

          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Master English for <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Software & Hardware
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            An interactive and immersive tool designed to enrich your English IT
            vocabulary, pronunciation, and technical definitions in a fun
            Kahoot-style environment.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() =>
                document
                  .getElementById("learning-materials")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-slate-700 hover:border-slate-500 hover:bg-slate-800 transition-all text-white font-medium flex items-center justify-center gap-2 group"
            >
              Start Learning
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
              href="/quiz"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 transition-all hover:-translate-y-0.5"
            >
              <Play className="w-4 h-4 fill-current" />
              Try Kahoot! Quiz
            </Link>
          </div>
        </section>

        {/* --- FEATURES SECTION --- */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid md:cols-3 gap-6 grid-cols-1 md:grid-cols-3">
            <div className="bg-[#131B2B] border border-slate-800 p-8 rounded-2xl hover:border-indigo-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6">
                <BookOpen className="text-indigo-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Rich Vocabulary
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Deep dive into crucial hardware & software terms with
                comprehensive usage contexts.
              </p>
            </div>

            <div className="bg-[#131B2B] border border-slate-800 p-8 rounded-2xl hover:border-pink-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-6">
                <Volume2 className="text-pink-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Pronunciation Keys
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Standard phonetic transcripts so you know exactly how to say
                terms confidently.
              </p>
            </div>

            <div className="bg-[#131B2B] border border-slate-800 p-8 rounded-2xl hover:border-emerald-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6">
                <CheckCircle2 className="text-emerald-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Gamified Testing
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Challenge yourself with dynamic quiz scores, timers, and
                extensive explanation cards.
              </p>
            </div>
          </div>
        </section>

        {/* --- LEARNING MATERIALS SECTION --- */}
        <section
          id="learning-materials"
          className="max-w-7xl mx-auto px-6 py-24 relative"
        >
          {/* HEADER & CONTROL PANEL (RESPONSIVE FIX) */}
          <div className="mb-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Title Section */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-white mb-3">
                Learning Materials
              </h2>
              <p className="text-slate-400">
                Select a category to learn terms, phonetic transcripts,
                comprehensive definitions, and real context.
              </p>
            </div>
          </div>

          {/* TAB NAVIGATION (RESPONSIVE FIX) */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2 sm:gap-3 mb-10 bg-[#131B2B] border border-slate-800 p-2 rounded-xl w-full sm:w-auto sm:inline-flex">
            <button
              onClick={() => setActiveTab("hardware")}
              className={`px-5 py-3 sm:py-2.5 rounded-lg font-medium text-sm flex items-center justify-center sm:justify-start gap-2 transition-all ${
                activeTab === "hardware"
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent"
              }`}
            >
              <Cpu className="w-4 h-4" /> Hardware Components
            </button>
            <button
              onClick={() => setActiveTab("software")}
              className={`px-5 py-3 sm:py-2.5 rounded-lg font-medium text-sm flex items-center justify-center sm:justify-start gap-2 transition-all ${
                activeTab === "software"
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent"
              }`}
            >
              <TerminalSquare className="w-4 h-4" /> Software Core
            </button>
            <button
              onClick={() => setActiveTab("usage")}
              className={`px-5 py-3 sm:py-2.5 rounded-lg font-medium text-sm flex items-center justify-center sm:justify-start gap-2 transition-all ${
                activeTab === "usage"
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent"
              }`}
            >
              <MonitorCheck className="w-4 h-4" /> Computer Usage
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {learningData[activeTab].map((item, index) => {
              const isTranslated = translatedItems.includes(item.id);
              const targetLang = isTranslated ? "id-ID" : "en-US";

              // Gabungkan teks lengkap untuk tombol Listen utama
              const fullSpeechText = `${item.term}. ${isTranslated ? item.definition.id : item.definition.en}. Context Scenario: ${isTranslated ? item.context.id : item.context.en}. Professional Insight: ${isTranslated ? item.note.id : item.note.en}`;

              // Cek status khusus kartu ini
              const isThisCardPlaying = currentPlayingId === item.id;

              return (
                <div
                  key={item.id}
                  className="bg-[#131B2B] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
                >
                  <div>
                    <div className="flex justify-between items-center mb-5 gap-2">
                      <span className="bg-indigo-500/10 text-indigo-400 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                        Term #{index + 1}
                      </span>
                      <button
                        onClick={() =>
                          handleListenClick(item.id + 1000, item.term, "en-US")
                        }
                        title="Hear Pronunciation"
                        className={`flex items-center gap-1.5 text-slate-300 text-xs font-mono bg-slate-900/80 px-2.5 py-1 rounded-md border transition-all active:scale-95 ${
                          currentPlayingId === item.id + 1000 &&
                          isPlaying &&
                          !isPaused
                            ? "border-emerald-500 text-emerald-400 bg-slate-900"
                            : "border-slate-800 hover:border-slate-700 hover:text-emerald-400"
                        }`}
                      >
                        <Volume2
                          className={`w-3.5 h-3.5 text-indigo-400 ${currentPlayingId === item.id + 1000 && isPlaying && !isPaused ? "animate-pulse text-emerald-400" : ""}`}
                        />
                        {item.phonetic}
                      </button>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.term}
                    </h3>

                    <p className="text-slate-400 text-sm mb-5 leading-relaxed line-clamp-3">
                      {isTranslated ? item.definition.id : item.definition.en}
                    </p>
                  </div>

                  <div>
                    <div className="pt-4 border-t border-slate-800/60 space-y-3">
                      <div>
                        <span className="text-[10px] font-bold tracking-wider text-indigo-400 uppercase block mb-1">
                          Context Example:
                        </span>
                        <p className="text-slate-300 text-xs italic font-serif leading-relaxed line-clamp-2">
                          {isTranslated ? item.context.id : item.context.en}
                        </p>
                      </div>

                      <div className="text-[11px] text-slate-400 bg-slate-950/40 p-2.5 rounded-lg border border-slate-900">
                        <strong className="text-white font-semibold">
                          Note:{" "}
                        </strong>
                        <span className="line-clamp-2">
                          {isTranslated ? item.note.id : item.note.en}
                        </span>
                      </div>
                    </div>

                    {/* INTERACTIVE ACTIONS */}
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <button
                        onClick={() => toggleTranslation(item.id)}
                        className="py-2 px-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-medium flex items-center justify-center gap-1 text-slate-300 transition-colors"
                      >
                        <Languages className="w-3.5 h-3.5 text-purple-400" />
                        {isTranslated ? "Show EN" : "Trans ID"}
                      </button>

                      {/* TOMBOL LISTEN SINKRONISASI PAUSE / PLAY */}
                      <button
                        onClick={() =>
                          handleListenClick(item.id, fullSpeechText, targetLang)
                        }
                        className={`py-2 px-1 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 transition-all border ${
                          isThisCardPlaying && isPlaying
                            ? isPaused
                              ? "bg-amber-500/20 text-amber-400 border-amber-500/40 hover:bg-amber-500 hover:text-white"
                              : "bg-indigo-600 text-white border-indigo-500 animate-pulse"
                            : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white"
                        }`}
                      >
                        {isThisCardPlaying && isPlaying ? (
                          isPaused ? (
                            <>
                              <Play className="w-3.5 h-3.5 fill-current" />
                              Resume
                            </>
                          ) : (
                            <>
                              <Pause className="w-3.5 h-3.5 fill-current" />
                              Pause
                            </>
                          )
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            Listen
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setOpenedBook(item);
                          setIsModalTranslated(isTranslated);
                        }}
                        className="py-2 px-1 bg-indigo-600/10 hover:bg-indigo-600 border border-indigo-500/20 hover:border-indigo-500 text-indigo-400 hover:text-white rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 transition-all"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= STUDY BOOK MODAL OVERLAY ================= */}
          {openedBook && (
            <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-[#0f1524] border border-slate-800 w-full max-w-4xl rounded-2xl shadow-2xl shadow-black/50 overflow-hidden flex flex-col md:flex-row h-auto md:h-[550px] animate-in fade-in zoom-in-95 duration-200">
                {/* LEFT BOOK PAGE: Theory */}
                <div className="flex-1 p-8 border-b border-slate-800 md:border-b-0 md:border-r border-dashed border-slate-700 bg-[#121a2c]/50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-indigo-400 tracking-wider uppercase mb-4">
                      <span className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Left Page — Theory
                      </span>
                      <button
                        onClick={() =>
                          handleListenClick(
                            openedBook.id + 2000,
                            openedBook.term,
                            "en-US",
                          )
                        }
                        className={`p-1 px-2.5 rounded-md bg-slate-900 border flex items-center gap-1.5 normal-case font-mono text-[11px] text-slate-300 transition-all ${
                          currentPlayingId === openedBook.id + 2000 &&
                          isPlaying &&
                          !isPaused
                            ? "border-emerald-500 text-emerald-400"
                            : "border-slate-800 hover:border-emerald-500 hover:text-emerald-400"
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                        {openedBook.phonetic}
                      </button>
                    </div>

                    <h3 className="text-3xl font-black text-white mb-5 tracking-tight">
                      {openedBook.term}
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                            <Layers className="w-3 h-3 text-emerald-400" /> Full
                            Definition Literature:
                          </h4>
                          <button
                            onClick={() =>
                              handleListenClick(
                                openedBook.id + 3000,
                                isModalTranslated
                                  ? openedBook.definition.id
                                  : openedBook.definition.en,
                                isModalTranslated ? "id-ID" : "en-US",
                              )
                            }
                            className={`p-1 rounded border transition-colors ${
                              currentPlayingId === openedBook.id + 3000 &&
                              isPlaying &&
                              !isPaused
                                ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                                : "bg-slate-800/50 border-transparent text-slate-400 hover:text-emerald-400"
                            }`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-slate-200 text-sm leading-relaxed text-justify font-sans">
                          {isModalTranslated
                            ? openedBook.definition.id
                            : openedBook.definition.en}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                          <HelpCircle className="w-3 h-3 text-indigo-400" />{" "}
                          Structural Examples:
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {openedBook.examples.map(
                            (ex: string, idx: number) => (
                              <span
                                key={idx}
                                className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md text-xs text-slate-300 font-medium"
                              >
                                {ex}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/60 text-[10px] font-mono text-slate-500">
                    Source Framework: {openedBook.source}
                  </div>
                </div>

                {/* RIGHT BOOK PAGE: Practice & Insight */}
                <div className="flex-1 p-8 bg-[#131b2e] flex flex-col justify-between relative">
                  <button
                    onClick={() => {
                      stopAudio();
                      setOpenedBook(null);
                    }}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 rounded-full border border-slate-800 transition-all z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-purple-400 tracking-wider uppercase mb-4">
                      <TerminalSquare className="w-4 h-4" />
                      Right Page — Applied Practice
                    </div>

                    <div className="space-y-5 mt-6">
                      <div className="bg-slate-950/40 border border-slate-800/80 p-4 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold tracking-wider text-indigo-400 uppercase block">
                            Context Scenario:
                          </span>
                          <button
                            onClick={() =>
                              handleListenClick(
                                openedBook.id + 4000,
                                isModalTranslated
                                  ? openedBook.context.id
                                  : openedBook.context.en,
                                isModalTranslated ? "id-ID" : "en-US",
                              )
                            }
                            className={`p-1 rounded border transition-colors ${
                              currentPlayingId === openedBook.id + 4000 &&
                              isPlaying &&
                              !isPaused
                                ? "bg-indigo-500/20 border-indigo-500 text-indigo-400"
                                : "bg-slate-900 border-transparent text-slate-400 hover:text-indigo-400"
                            }`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-slate-200 text-sm italic font-serif leading-relaxed">
                          "
                          {isModalTranslated
                            ? openedBook.context.id
                            : openedBook.context.en}
                          "
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                            <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />{" "}
                            Professional Insight:
                          </h4>
                          <button
                            onClick={() =>
                              handleListenClick(
                                openedBook.id + 5000,
                                isModalTranslated
                                  ? openedBook.note.id
                                  : openedBook.note.en,
                                isModalTranslated ? "id-ID" : "en-US",
                              )
                            }
                            className={`p-1 rounded border transition-colors ${
                              currentPlayingId === openedBook.id + 5000 &&
                              isPlaying &&
                              !isPaused
                                ? "bg-amber-500/20 border-amber-500 text-amber-500"
                                : "bg-slate-800/50 border-transparent text-slate-400 hover:text-amber-500"
                            }`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-slate-300 text-xs bg-amber-500/5 border border-amber-500/10 p-3.5 rounded-xl leading-relaxed">
                          {isModalTranslated
                            ? openedBook.note.id
                            : openedBook.note.en}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/60 flex justify-between items-center text-[10px] font-mono text-slate-500">
                    <button
                      onClick={() => setIsModalTranslated(!isModalTranslated)}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-sans font-semibold text-slate-300 flex items-center gap-1.5 border border-slate-800 transition-colors"
                    >
                      <Languages className="w-3.5 h-3.5 text-purple-400" />
                      {isModalTranslated
                        ? "View English Page"
                        : "Translate Page (ID)"}
                    </button>

                    <button
                      onClick={() => {
                        stopAudio();
                        setOpenedBook(null);
                      }}
                      className="text-indigo-400 hover:underline font-bold text-xs font-sans"
                    >
                      Close Book →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
