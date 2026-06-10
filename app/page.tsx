"use client";
import React, { useState } from 'react';
import { 
  BookOpen, 
  Volume2, 
  ArrowRight, 
  Play, 
  Cpu, 
  TerminalSquare, 
  MonitorCheck,
  CheckCircle2,
  Zap
} from 'lucide-react';


export default function Page() {
  // State untuk melacak tab materi yang sedang aktif
  const [activeTab, setActiveTab] = useState<'hardware' | 'software' | 'usage'>('software');

  // Data materi pembelajaran dibagi menjadi 3 kategori
  const learningData = {
    hardware: [
      {
        id: 1,
        term: 'Central Processing Unit (CPU)',
        phonetic: '/ˈsen.trəl ˈprɑː.ses.ɪŋ ˌjuː.nɪt/',
        definition: 'Komponen utama komputer yang bertindak sebagai "otak", melakukan sebagian besar pemrosesan di dalam komputer.',
        context: '"The new processor handles heavy video rendering tasks much faster due to its multi-core CPU architecture."',
        note: 'CPU performance is typically measured in gigahertz (GHz) and by the number of cores.'
      },
      {
        id: 2,
        term: 'Random Access Memory (RAM)',
        phonetic: '/rændəm ˈækses ˈmeməri/',
        definition: 'Memori komputer jangka pendek tempat data disimpan sesuai kebutuhan agar prosesor dapat dengan cepat mengaksesnya.',
        context: '"If your computer is lagging while running multiple apps, upgrading your RAM might help."',
        note: 'RAM is volatile memory, meaning it loses its data when the computer is turned off.'
      },
      {
        id: 3,
        term: 'Motherboard',
        phonetic: '/ˈmʌð.ɚ.bɔːrd/',
        definition: 'Papan sirkuit cetak utama pada komputer umum dan sistem yang dapat diperluas lainnya.',
        context: '"Make sure the new graphics card is compatible with the PCIe slots on your motherboard."',
        note: 'It holds and allows communication between many of the crucial electronic components.'
      }
    ],
    software: [
      {
        id: 1,
        term: 'Operating System (OS)',
        phonetic: '/ˈɑː.pə.reɪ.t̬ɪŋ ˌsɪs.təm/',
        definition: 'Perangkat lunak inti yang mengelola memori dan proses komputer, serta semua perangkat keras dan perangkat lunak lainnya.',
        context: '"Windows, macOS, and Linux are popular operating systems."',
        note: 'An operating system acts as an intermediary between user applications and the hardware.'
      },
      {
        id: 2,
        term: 'Device Driver',
        phonetic: '/dɪˈvaɪs ˈdraɪ.vɚ/',
        definition: 'Jenis perangkat lunak spesifik yang memungkinkan sistem operasi untuk berkomunikasi secara efektif dengan perangkat keras.',
        context: '"You need to update your graphics card driver for optimal gaming performance."',
        note: 'Without the correct driver, the hardware component might not function at all.'
      },
      {
        id: 3,
        term: 'Firmware',
        phonetic: '/ˈfɝːm.wer/',
        definition: 'Kelas khusus perangkat lunak komputer yang menyediakan kontrol tingkat rendah untuk perangkat keras spesifik.',
        context: '"The BIOS on your computer is a common example of firmware."',
        note: 'Manufacturers occasionally release firmware updates to improve hardware stability and security.'
      }
    ],
    usage: [
      {
        id: 1,
        term: 'Troubleshooting',
        phonetic: '/ˈtrʌb.əl.ʃuː.t̬ŋ/',
        definition: 'Proses sistematis untuk menemukan akar penyebab masalah sistem dan memperbaikinya.',
        context: '"The IT support team is currently troubleshooting the network connectivity issues."',
        note: 'A good troubleshooting process always starts with gathering information about the problem.'
      },
      {
        id: 2,
        term: 'Deployment',
        phonetic: '/dɪˈplɔɪ.mənt/',
        definition: 'Semua aktivitas yang membuat sistem perangkat lunak atau pembaruan tersedia untuk digunakan.',
        context: '"We have scheduled the deployment of the new server update for midnight to minimize downtime."',
        note: 'Continuous deployment (CD) is a strategy in software engineering.'
      },
      {
        id: 3,
        term: 'Boot sequence',
        phonetic: '/buːt ˈsiː.kwəns/',
        definition: 'Kumpulan operasi awal yang dilakukan sistem komputer setelah daya dinyalakan.',
        context: '"If the computer fails to start, you might need to check the boot sequence in the BIOS settings."',
        note: 'Changing the boot sequence allows you to boot from a USB drive instead of the hard drive.'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-300 font-sans selection:bg-purple-500/30">
      <main>
        {/* --- HERO SECTION --- */}
        <section className="pt-24 pb-20 px-6 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            Aplikasi Pembelajaran Interaktif
          </div>
          
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Master English for <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Software & Hardware
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Alat interaktif dan imersif yang dirancang untuk memperkaya kosakata TI bahasa Inggris, pelafalan, dan definisi teknis Anda dalam lingkungan bergaya Kahoot! yang menyenangkan.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-slate-700 hover:border-slate-500 hover:bg-slate-800 transition-all text-white font-medium flex items-center justify-center gap-2 group">
              Mulai Belajar
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 transition-all hover:-translate-y-0.5">
              <Play className="w-4 h-4 fill-current" />
              Coba Kuis Kahoot!
            </button>
          </div>
        </section>

        {/* --- FEATURES SECTION --- */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#131B2B] border border-slate-800 p-8 rounded-2xl hover:border-indigo-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6">
                <BookOpen className="text-indigo-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Rich Vocabulary</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Menyelami istilah perangkat keras & lunak yang penting dengan konteks penggunaan yang komprehensif.
              </p>
            </div>
            
            <div className="bg-[#131B2B] border border-slate-800 p-8 rounded-2xl hover:border-pink-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-6">
                <Volume2 className="text-pink-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Pronunciation Keys</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Transkripsi fonetik standar agar Anda tahu persis bagaimana mengucapkan istilah dengan percaya diri.
              </p>
            </div>

            <div className="bg-[#131B2B] border border-slate-800 p-8 rounded-2xl hover:border-emerald-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6">
                <CheckCircle2 className="text-emerald-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Gamified Testing</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Tantang diri Anda dengan skor kuis dinamis, penghitung waktu, dan kartu penjelasan ekstensif.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-slate-800/60 max-w-7xl mx-auto" />

        {/* --- LEARNING MATERIALS SECTION --- */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Learning Materials</h2>
            <p className="text-slate-400">Pilih kategori untuk mempelajari istilah, transkripsi fonetik, definisi, dan konteks nyata.</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center gap-3 mb-10 bg-[#131B2B] border border-slate-800 p-2 rounded-xl inline-flex">
            <button 
              onClick={() => setActiveTab('hardware')}
              className={`px-5 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 transition-all ${
                activeTab === 'hardware' 
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent'
              }`}
            >
              <Cpu className="w-4 h-4" />
              Hardware Components
            </button>
            <button 
              onClick={() => setActiveTab('software')}
              className={`px-5 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 transition-all ${
                activeTab === 'software' 
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent'
              }`}
            >
              <TerminalSquare className="w-4 h-4" />
              Software Core
            </button>
            <button 
              onClick={() => setActiveTab('usage')}
              className={`px-5 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 transition-all ${
                activeTab === 'usage' 
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent'
              }`}
            >
              <MonitorCheck className="w-4 h-4" />
              Computer Usage
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {learningData[activeTab].map((item, index) => (
              <div key={item.id} className="bg-[#131B2B] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <span className="bg-indigo-500/10 text-indigo-400 text-xs font-bold px-3 py-1 rounded-full">
                      Term #{index + 1}
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono bg-slate-900/50 px-2 py-1 rounded-md border border-slate-800">
                      <Volume2 className="w-3.5 h-3.5" />
                      {item.phonetic}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{item.term}</h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    {item.definition}
                  </p>
                </div>

                <div className="pt-5 border-t border-slate-800/60 mt-auto">
                  <span className="text-[10px] font-bold tracking-wider text-indigo-400 uppercase mb-2 block">
                    Context Example:
                  </span>
                  <p className="text-slate-300 text-sm italic mb-4">
                    {item.context}
                  </p>
                  <p className="text-slate-400 text-xs">
                    <strong className="text-white font-semibold">Professional Note:</strong> {item.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}