import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Users, 
  Megaphone, 
  Briefcase,
  Settings,
  Bell,
  Cpu
} from 'lucide-react';
import Link from 'next/link';
import { t } from '@/lib/translations';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-emerald-500 selection:text-black">
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20" />

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-zinc-950 border-r border-zinc-900 z-50 flex flex-col">
        <div className="p-8 border-b border-zinc-900 flex items-center gap-3 group cursor-pointer">
          <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-black italic text-xl group-hover:rotate-12 transition-transform duration-500">
            K
          </div>
          <span className="font-black tracking-tighter text-xl uppercase italic group-hover:tracking-widest transition-all duration-500">MARKETING</span>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <SidebarLink icon={<LayoutDashboard size={18} />} label={t('nav.dashboard')} href="/" active />
          <SidebarLink icon={<Search size={18} />} label={t('nav.research')} href="/research" />
          <SidebarLink icon={<Users size={18} />} label={t('nav.competitors')} href="/competitors" />
          <SidebarLink icon={<Megaphone size={18} />} label={t('nav.adIntel')} href="/ads" />
          <SidebarLink icon={<Briefcase size={18} />} label={t('nav.leads')} href="/leads" />
        </nav>

        <div className="p-4 border-t border-zinc-900 space-y-2">
          <SidebarLink icon={<Settings size={18} />} label={t('nav.settings')} href="/settings" />
          <div className="mt-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-sm">
             <div className="flex items-center gap-2 mb-2">
               <Cpu className="w-3 h-3 text-emerald-500" />
               <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">{t('nav.modelStatus')}</span>
             </div>
             <div className="text-[10px] font-mono text-zinc-500">GEMINI-2.0-FLASH</div>
             <div className="mt-2 h-1 bg-zinc-800 w-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[85%]" />
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8 relative">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            <span>{t('sidebar.project')}</span>
            <span className="text-zinc-800">/</span>
            <span className="text-zinc-300">{t('sidebar.marketIntelligence')}</span>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border-2 border-black" />
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs font-bold uppercase tracking-wider">PRADIPT_ADMIN</div>
                <div className="text-[10px] font-mono text-emerald-500">{t('sidebar.userLevel')}</div>
              </div>
              <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center font-bold text-zinc-500">
                P
              </div>
            </div>
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

function SidebarLink({ icon, label, href, active = false }: SidebarLinkProps) {
  return (
    <Link 
      href={href}
      className={`
        flex items-center gap-4 px-4 py-3 rounded-sm transition-all duration-300 group
        ${active 
          ? 'bg-white text-black font-bold' 
          : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
        }
      `}
    >
      <span className={`${active ? 'text-black' : 'text-zinc-500 group-hover:text-emerald-400'} transition-colors`}>
        {icon}
      </span>
      <span className="text-xs uppercase tracking-[0.2em]">{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 bg-black rounded-full" />}
    </Link>
  );
}
