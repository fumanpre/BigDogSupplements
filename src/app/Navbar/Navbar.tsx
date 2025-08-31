'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ShoppingCartIcon,
  UserCircleIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline'
import { CiBarcode } from 'react-icons/ci'
import { IoLocationOutline } from 'react-icons/io5'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { IoIosSearch } from 'react-icons/io'
import { FaDumbbell, FaHeartbeat, FaRunning, FaAppleAlt } from 'react-icons/fa'

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<
    'brands' | 'categories' | 'goals' | null
  >(null)

  return (
    <>
      <div className="w-full text-white bg-black">
        <div className="drawer">
          <input id="mobile-menu" type="checkbox" className="drawer-toggle" />

          {/* Drawer Content */}
          <div className="drawer-content">
            {/* Navbar: Large Screens */}
            <div className="hidden sm:flex max-w-8xl mx-auto px-4 py-3 items-center justify-between gap-4">
              {/* Left: Logo */}
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="https://res.cloudinary.com/divvzytna/image/upload/v1754531602/BigDogLogoImage_hg6nnd.png"
                  height={180}
                  width={180}
                  alt="Logo"
                  priority // Optional: improves loading speed for above-the-fold images
                />
              </Link>

              {/* Center: Search Bar */}
              <form action="search" className="flex-grow max-w-xl">
                <div className="flex w-full">
                  <input
                    name="query"
                    type="text"
                    placeholder="Search Product"
                    className="input flex-grow rounded-l-full input-bordered text-white placeholder-white bg-white/10 backdrop-blur-sm 
                 focus:bg-white focus:text-black focus:placeholder-gray-400 
                 transition-colors duration-300 border-white hover:bg-white hover:placeholder-black"
                  />
                  <button className="btn rounded-r-full">
                    <IoIosSearch className="h-6 w-6" />
                  </button>
                </div>
              </form>

              {/* Right: Cart & Account */}
              <div className="flex items-center gap-4 lg:gap-6">
                {/* Right: Cart, Barcode & Account */}
                <div className="flex items-center gap-4 lg:gap-6">
                  {/* Cart */}
                  <Link href="/cart" className="btn btn-ghost btn-circle">
                    <ShoppingCartIcon className="h-6 w-6 text-white lg:h-8 lg:w-8 hover:text-black" />
                  </Link>

                  {/* Barcode Image */}
                  <Link href="/cart" className="btn btn-ghost btn-circle">
                    <CiBarcode className="h-6 w-6 text-white lg:h-8 lg:w-8 hover:text-black" />
                  </Link>
                </div>

                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <UserCircleIcon className="h-6 w-6 text-white lg:h-8 lg:w-8 hover:text-black" />
                  </div>
                  <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40 text-black">
                    <li>
                      <Link href="/account">Profile</Link>
                    </li>
                    <li>
                      <Link href="/orders">Orders</Link>
                    </li>
                    <li>
                      <Link href="/logout">Logout</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 🔽 NEW: Secondary Navbar for large screens */}
            <div className="hidden sm:flex max-w-8xl mx-auto px-4 py-2 items-center justify-between gap-0.5 lg:gap-4 border-white/10">
              {/* Left: Dropdown Menus */}
              <div className="flex lg:gap-2 items-center">
                {/* All Brands Dropdown */}
                <div className="relative">
                  {/* Button to toggle dropdown */}
                  <div
                    tabIndex={0}
                    role="button"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === 'brands' ? null : 'brands'
                      )
                    }
                    className="btn btn-ghost lg:text-lg text-white normal-case hover:bg-white hover:text-black hover:rounded-2xl"
                  >
                    All Brands
                    <RiArrowDropDownLine className="h-5 w-5" />
                  </div>

                  {/* Dropdown content */}
                  {openDropdown === 'brands' && (
                    <ul
                      tabIndex={0}
                      className="absolute sm:text-sm lg:text-md xl:text-lg  sm:translate-x-1/22 lg:translate-x-1/22  xl:translate-x-1/22 z-[25]  sm:p-3 md:p-5 lg:p-7 xl:p-10 pr-0 shadow rounded-box sm:w-[90vw] text-white bg-black max-h-[100vh] grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-2"
                      onMouseLeave={() => setOpenDropdown(null)} // Close when mouse leaves the dropdown
                    >
                      <Link href="/search?query=allmax">
                        <li>AllMax</li>
                      </Link>
                      <Link href="/search?query=animal">
                        <li>Animal</li>
                      </Link>
                      <Link href="/search?query=ans">
                        <li>ANS</li>
                      </Link>
                      <Link href="/search?query=atp-labs">
                        <li>ATP Labs</li>
                      </Link>
                      <Link href="/search?query=b1">
                        <li>B1</li>
                      </Link>
                      <Link href="/search?query=basics">
                        <li>Basics</li>
                      </Link>
                      <Link href="/search?query=believe">
                        <li>Believe</li>
                      </Link>
                      <Link href="/search?query=beyond-yourself">
                        <li>Beyond Yourself</li>
                      </Link>
                      <Link href="/search?query=bio-x">
                        <li>Bio X</li>
                      </Link>
                      <Link href="/search?query=bsn">
                        <li>BSN</li>
                      </Link>
                      <Link href="/search?query=cbum-x-raw">
                        <li>CBum x RAW</li>
                      </Link>
                      <Link href="/search?query=cellucor-c4">
                        <li>C4 (Cellucor)</li>
                      </Link>
                      <Link href="/search?query=cutler-nutrition">
                        <li>Cutler Nutrition</li>
                      </Link>
                      <Link href="/search?query=diesel">
                        <li>Diesel</li>
                      </Link>
                      <Link href="/search?query=dymatize">
                        <li>Dymatize</li>
                      </Link>
                      <Link href="/search?query=elev8-food">
                        <li>Elev8 Food</li>
                      </Link>
                      <Link href="/search?query=evogen">
                        <li>Evogen</li>
                      </Link>
                      <Link href="/search?query=fairlife">
                        <li>Fairlife</li>
                      </Link>
                      <Link href="/search?query=gat">
                        <li>GAT</li>
                      </Link>
                      <Link href="/search?query=ghost">
                        <li>Ghost</li>
                      </Link>
                      <Link href="/search?query=g-hughes">
                        <li>G Hughes</li>
                      </Link>
                      <Link href="/search?query=grenade">
                        <li>Grenade</li>
                      </Link>
                      <Link href="/search?query=himalaya">
                        <li>Himalaya</li>
                      </Link>
                      <Link href="/search?query=hd-muscle">
                        <li>HD Muscle</li>
                      </Link>
                      <Link href="/search?query=iron-kingdom">
                        <li>Iron Kingdom</li>
                      </Link>
                      <Link href="/search?query=jackedfactory">
                        <li>JackedFactory</li>
                      </Link>
                      <Link href="/search?query=labrada">
                        <li>Labrada</li>
                      </Link>
                      <Link href="/search?query=magnum">
                        <li>Magnum</li>
                      </Link>
                      <Link href="/search?query=mammoth">
                        <li>Mammoth</li>
                      </Link>
                      <Link href="/search?query=muscle-tech">
                        <li>MuscleTech</li>
                      </Link>
                      <Link href="/search?query=musclemeds">
                        <li>MuscleMeds</li>
                      </Link>
                      <Link href="/search?query=mutant">
                        <li>Mutant</li>
                      </Link>
                      <Link href="/search?query=myprotein">
                        <li>MyProtein</li>
                      </Link>
                      <Link href="/search?query=now">
                        <li>NOW</li>
                      </Link>
                      <Link href="/search?query=nutrabolics">
                        <li>Nutrabolics</li>
                      </Link>
                      <Link href="/search?query=nutrition">
                        <li>Nutrition</li>
                      </Link>
                      <Link href="/search?query=optimum-nutrition">
                        <li>Optimum Nutrition</li>
                      </Link>
                      <Link href="/search?query=performance">
                        <li>Performance</li>
                      </Link>
                      <Link href="/search?query=prime">
                        <li>Prime</li>
                      </Link>
                      <Link href="/search?query=progressive">
                        <li>Progressive</li>
                      </Link>
                      <Link href="/search?query=pvl">
                        <li>PVL</li>
                      </Link>
                      <Link href="/search?query=quest">
                        <li>Quest</li>
                      </Link>
                      <Link href="/search?query=redcon1">
                        <li>Redcon1</li>
                      </Link>
                      <Link href="/search?query=revive">
                        <li>Revive</li>
                      </Link>
                      <Link href="/search?query=rule1">
                        <li>Rule 1</li>
                      </Link>
                      <Link href="/search?query=ryse">
                        <li>RYSE</li>
                      </Link>
                      <Link href="/search?query=skinny-mixes">
                        <li>Skinny Mixes</li>
                      </Link>
                    </ul>
                  )}
                </div>

                {/* Categories Dropdown */}
                <div className="relative">
                  {/* Button to toggle dropdown */}
                  <div
                    tabIndex={0}
                    role="button"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === 'categories' ? null : 'categories'
                      )
                    }
                    className="btn btn-ghost lg:text-lg text-white normal-case hover:bg-white hover:text-black hover:rounded-2xl"
                  >
                    Categories
                    <RiArrowDropDownLine className="h-5 w-5" />
                  </div>

                  {/* Dropdown content */}
                  {openDropdown === 'categories' && (
                    <ul
                      tabIndex={0}
                      className="absolute sm:text-sm lg:text-md xl:text-lg sm:-translate-x-1/6 md:-translate-x-1/8 lg:-translate-x-1/8  xl:-translate-x-1/16 z-[25]  sm:p-3 md:p-5 lg:p-7 xl:p-10 pr-0 shadow rounded-box sm:w-[90vw] text-white bg-black max-h-[70vh] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-2"
                      onMouseLeave={() => setOpenDropdown(null)} // Close when mouse leaves the dropdown
                    >
                      <Link href="/search?query=protein">
                        <li>Protein</li>
                      </Link>
                      <Link href="/search?query=whey-protein">
                        <li>Whey Protein</li>
                      </Link>
                      <Link href="/search?query=isolate">
                        <li>Isolate Protein</li>
                      </Link>
                      <Link href="/search?query=casein">
                        <li>Casein Protein</li>
                      </Link>
                      <Link href="/search?query=vegan-protein">
                        <li>Vegan Protein</li>
                      </Link>
                      <Link href="/search?query=pre-workout">
                        <li>Pre-Workout</li>
                      </Link>
                      <Link href="/search?query=stimulant-free">
                        <li>Stimulant-Free Pre-Workout</li>
                      </Link>
                      <Link href="/search?query=pump-boosters">
                        <li>Pump Boosters</li>
                      </Link>
                      <Link href="/search?query=bcaa-eca">
                        <li>BCAA / EAA</li>
                      </Link>
                      <Link href="/search?query=creatine">
                        <li>Creatine</li>
                      </Link>
                      <Link href="/search?query=fat-burners">
                        <li>Fat Burners</li>
                      </Link>
                      <Link href="/search?query=test-boosters">
                        <li>Testosterone Boosters</li>
                      </Link>
                      <Link href="/search?query=multivitamins">
                        <li>Multivitamins</li>
                      </Link>
                      <Link href="/search?query=joint-health">
                        <li>Joint Health</li>
                      </Link>
                      <Link href="/search?query=fish-oil">
                        <li>Fish Oil / Omega-3</li>
                      </Link>
                      <Link href="/search?query=digestive-health">
                        <li>Digestive Health</li>
                      </Link>
                      <Link href="/search?query=sleep-support">
                        <li>Sleep Support</li>
                      </Link>
                    </ul>
                  )}
                </div>

                {/* Goals Dropdown */}
                <div className="relative">
                  <div
                    tabIndex={0}
                    role="button"
                    onClick={() =>
                      setOpenDropdown(openDropdown === 'goals' ? null : 'goals')
                    }
                    className="btn btn-ghost lg:text-lg text-white normal-case hover:bg-white hover:text-black hover:rounded-2xl"
                  >
                    Goals
                    <RiArrowDropDownLine className='className="h-5 w-5"' />
                  </div>
                  {openDropdown === 'goals' && (
                    <ul
                      tabIndex={0}
                      className="absolute z-[25] p-4 shadow bg-black rounded-box sm:min-w-[30vw] md:min-w-[24vw] lg:min-w-[22vw] xl:min-w-[14vw] sm:text-sm lg:text-md xl:text-lg  sm:p-3 md:p-5 lg:p-7 xl:p-5 pr-0 text-white "
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <Link href="/goals/muscle-gain">
                        <li className="flex items-center gap-3 m-3 hover:underline group">
                          <FaDumbbell className="text-blue-500 transform transition-transform duration-200 group-hover:scale-180" />
                          Muscle Gain
                        </li>
                      </Link>

                      <Link href="/goals/weight-loss">
                        <li className="flex items-center gap-3 m-3 hover:underline group">
                          <FaHeartbeat className="text-red-500 transform transition-transform duration-200 group-hover:scale-180" />
                          Weight Loss
                        </li>
                      </Link>

                      <Link href="/goals/endurance">
                        <li className="flex items-center gap-3 m-3 hover:underline group">
                          <FaRunning className="text-green-500 transform transition-transform duration-200 group-hover:scale-180" />
                          Endurance
                        </li>
                      </Link>

                      <Link href="/goals/overall-health">
                        <li className="flex items-center gap-3 m-3 hover:underline group">
                          <FaAppleAlt className="text-yellow-500 transform transition-transform duration-200 group-hover:scale-180" />
                          Overall Health
                        </li>
                      </Link>
                    </ul>
                  )}
                </div>

                {/* Sale Button */}
                <Link
                  href="/search?query=Sale"
                  className="btn btn-ghost lg:text-lg text-white normal-case hover:bg-white hover:text-black hover:rounded-2xl"
                >
                  Sale
                </Link>

                {/* Clearence Button */}
                <Link
                  href="/clearence"
                  className="btn btn-ghost lg:text-lg text-white normal-case hover:bg-white hover:text-black hover:rounded-2xl"
                >
                  Clearence
                </Link>
              </div>

              {/* Right: Location Dropdown */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:text-lg text-white normal-case hover:bg-white hover:text-black hover:rounded-2xl"
                >
                  <IoLocationOutline className="w-6 h-6" />
                  Locations
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content mt-3 z-[1] p-2 shadow bg-black rounded-box w-40 text-white space-y-1 "
                >
                  <li>
                    <a>Canada</a>
                  </li>
                  <li>
                    <a>United States</a>
                  </li>
                  <li>
                    <a>United Kingdom</a>
                  </li>
                  <li>
                    <a>Australia</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Navbar: Small Screens */}
            <div className="sm:hidden">
              {/* Top Bar: Hamburger + Logo */}
              <div className="flex items-center justify-between px-4 py-3">
                <label
                  htmlFor="mobile-menu"
                  className="btn btn-ghost btn-circle"
                >
                  <Bars3Icon className="h-6 w-6 text-white" />
                </label>

                <Link href="/" className="flex-shrink-0 ml-6">
                  <Image
                    src="https://res.cloudinary.com/divvzytna/image/upload/v1754531602/BigDogLogoImage_hg6nnd.png"
                    height={160}
                    width={160}
                    alt="Logo"
                  />
                </Link>

                <div className="flex items-center gap-1">
                  {/* Cart */}
                  <Link href="/cart" className="btn btn-ghost btn-circle">
                    <ShoppingCartIcon className="h-6 w-6 text-white lg:h-8 lg:w-8" />
                  </Link>

                  {/* Barcode Image */}
                  <div className="flex items-center">
                    <CiBarcode className="h-6 w-6 text-white lg:h-8 lg:w-8" />
                  </div>
                </div>
              </div>

              {/* Second Bar: Search */}
              <div className="px-4 pb-3">
                <form action="search" className="w-full">
                  <div className="form-control">
                    <input
                      name="query"
                      type="text"
                      placeholder="Search Product"
                      className="input input-bordered w-full text-white placeholder-white bg-white/10 backdrop-blur-sm focus:bg-white focus:text-black focus:placeholder-gray-400 transition-colors duration-300"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Drawer Side */}
          <div className="drawer-side z-50">
            <label htmlFor="mobile-menu" className="drawer-overlay"></label>
            <div className="p-4 w-64 min-h-full bg-black text-white">
              {/* Accordion Menu */}
              <div className="join join-vertical bg-black">
                {/* All Brands */}
                <div className="collapse collapse-arrow join-item  border-gray-700">
                  <input type="checkbox" name="drawer-accordion" />
                  <div className="collapse-title font-semibold text-lg">
                    All Brands
                  </div>
                  <div className="collapse-content text-sm">
                    <ul className="space-y-2">
                      <Link href="/search?query=allmax">
                        <li>AllMax</li>
                      </Link>
                      <Link href="/search?query=animal">
                        <li>Animal</li>
                      </Link>
                      <Link href="/search?query=ans">
                        <li>ANS</li>
                      </Link>
                      <Link href="/search?query=atp-labs">
                        <li>ATP Labs</li>
                      </Link>
                      <Link href="/search?query=b1">
                        <li>B1</li>
                      </Link>
                      <Link href="/search?query=basics">
                        <li>Basics</li>
                      </Link>
                      <Link href="/search?query=believe">
                        <li>Believe</li>
                      </Link>
                      <Link href="/search?query=beyond-yourself">
                        <li>Beyond Yourself</li>
                      </Link>
                      <Link href="/search?query=bio-x">
                        <li>Bio X</li>
                      </Link>
                      <Link href="/search?query=bsn">
                        <li>BSN</li>
                      </Link>
                      <Link href="/search?query=cbum-x-raw">
                        <li>CBum x RAW</li>
                      </Link>
                      <Link href="/search?query=cellucor-c4">
                        <li>C4 (Cellucor)</li>
                      </Link>
                      <Link href="/search?query=cutler-nutrition">
                        <li>Cutler Nutrition</li>
                      </Link>
                      <Link href="/search?query=diesel">
                        <li>Diesel</li>
                      </Link>
                      <Link href="/search?query=dymatize">
                        <li>Dymatize</li>
                      </Link>
                      <Link href="/search?query=elev8-food">
                        <li>Elev8 Food</li>
                      </Link>
                      <Link href="/search?query=evogen">
                        <li>Evogen</li>
                      </Link>
                      <Link href="/search?query=fairlife">
                        <li>Fairlife</li>
                      </Link>
                      <Link href="/search?query=gat">
                        <li>GAT</li>
                      </Link>
                      <Link href="/search?query=ghost">
                        <li>Ghost</li>
                      </Link>
                      <Link href="/search?query=g-hughes">
                        <li>G Hughes</li>
                      </Link>
                      <Link href="/search?query=grenade">
                        <li>Grenade</li>
                      </Link>
                      <Link href="/search?query=himalaya">
                        <li>Himalaya</li>
                      </Link>
                      <Link href="/search?query=hd-muscle">
                        <li>HD Muscle</li>
                      </Link>
                      <Link href="/search?query=iron-kingdom">
                        <li>Iron Kingdom</li>
                      </Link>
                      <Link href="/search?query=jackedfactory">
                        <li>JackedFactory</li>
                      </Link>
                      <Link href="/search?query=labrada">
                        <li>Labrada</li>
                      </Link>
                      <Link href="/search?query=magnum">
                        <li>Magnum</li>
                      </Link>
                      <Link href="/search?query=mammoth">
                        <li>Mammoth</li>
                      </Link>
                      <Link href="/search?query=muscle-tech">
                        <li>MuscleTech</li>
                      </Link>
                      <Link href="/search?query=musclemeds">
                        <li>MuscleMeds</li>
                      </Link>
                      <Link href="/search?query=mutant">
                        <li>Mutant</li>
                      </Link>
                      <Link href="/search?query=myprotein">
                        <li>MyProtein</li>
                      </Link>
                      <Link href="/search?query=now">
                        <li>NOW</li>
                      </Link>
                      <Link href="/search?query=nutrabolics">
                        <li>Nutrabolics</li>
                      </Link>
                      <Link href="/search?query=nutrition">
                        <li>Nutrition</li>
                      </Link>
                      <Link href="/search?query=optimum-nutrition">
                        <li>Optimum Nutrition</li>
                      </Link>
                      <Link href="/search?query=performance">
                        <li>Performance</li>
                      </Link>
                      <Link href="/search?query=prime">
                        <li>Prime</li>
                      </Link>
                      <Link href="/search?query=progressive">
                        <li>Progressive</li>
                      </Link>
                      <Link href="/search?query=pvl">
                        <li>PVL</li>
                      </Link>
                      <Link href="/search?query=quest">
                        <li>Quest</li>
                      </Link>
                      <Link href="/search?query=redcon1">
                        <li>Redcon1</li>
                      </Link>
                      <Link href="/search?query=revive">
                        <li>Revive</li>
                      </Link>
                      <Link href="/search?query=rule1">
                        <li>Rule 1</li>
                      </Link>
                      <Link href="/search?query=ryse">
                        <li>RYSE</li>
                      </Link>
                      <Link href="/search?query=skinny-mixes">
                        <li>Skinny Mixes</li>
                      </Link>
                    </ul>
                  </div>
                </div>

                {/* Categories */}
                <div className="collapse collapse-arrow join-item border-gray-700">
                  <input type="checkbox" name="drawer-accordion" />
                  <div className="collapse-title font-semibold text-lg">
                    Categories
                  </div>
                  <div className="collapse-content text-sm">
                    <ul className="space-y-2">
                      <li>
                        <Link href="/search?query=protein">Protein</Link>
                      </li>
                      <li>
                        <Link href="/search?query=whey-protein">
                          Whey Protein
                        </Link>
                      </li>
                      <li>
                        <Link href="/search?query=isolate">
                          Isolate Protein
                        </Link>
                      </li>
                      <li>
                        <Link href="/search?query=casein">Casein Protein</Link>
                      </li>
                      <li>
                        <Link href="/search?query=vegan-protein">
                          Vegan Protein
                        </Link>
                      </li>
                      <li>
                        <Link href="/search?query=pre-workout">
                          Pre-Workout
                        </Link>
                      </li>
                      <li>
                        <Link href="/search?query=stimulant-free">
                          Stimulant-Free Pre-Workout
                        </Link>
                      </li>
                      <li>
                        <Link href="/search?query=pump-boosters">
                          Pump Boosters
                        </Link>
                      </li>
                      <li>
                        <Link href="/search?query=bcaa-eca">BCAA / EAA</Link>
                      </li>
                      <li>
                        <Link href="/search?query=creatine">Creatine</Link>
                      </li>
                      <li>
                        <Link href="/search?query=fat-burners">
                          Fat Burners
                        </Link>
                      </li>
                      <li>
                        <Link href="/search?query=test-boosters">
                          Testosterone Boosters
                        </Link>
                      </li>
                      <li>
                        <Link href="/search?query=multivitamins">
                          Multivitamins
                        </Link>
                      </li>
                      <li>
                        <Link href="/search?query=joint-health">
                          Joint Health
                        </Link>
                      </li>
                      <li>
                        <Link href="/search?query=fish-oil">
                          Fish Oil / Omega-3
                        </Link>
                      </li>
                      <li>
                        <Link href="/search?query=digestive-health">
                          Digestive Health
                        </Link>
                      </li>
                      <li>
                        <Link href="/search?query=sleep-support">
                          Sleep Support
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Goals */}
                <div className="collapse collapse-arrow join-item  border-gray-700">
                  <input type="checkbox" name="drawer-accordion" />
                  <div className="collapse-title font-semibold text-lg">
                    Goals
                  </div>
                  <div className="collapse-content text-sm">
                    <ul className="space-y-2">
                      <li>
                        <Link href="/goals/muscle-gain">Muscle Gain</Link>
                      </li>
                      <li>
                        <Link href="/goals/weight-loss">Weight Loss</Link>
                      </li>
                      <li>
                        <Link href="/goals/endurance">Endurance</Link>
                      </li>
                      <li>
                        <Link href="/goals/overall-health">Overall Health</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sale & Clearance Buttons */}
              <div className="mt-2.5 space-y-2">
                <Link
                  href="/search?query=Sale"
                  className="btn btn-ghost block font-semibold text-white normal-case text-left text-lg"
                >
                  Sale
                </Link>
                <Link
                  href="/clearence"
                  className="btn btn-ghost block font-semibold text-white normal-case text-left text-lg"
                >
                  Clearance
                </Link>
                <Link
                  href="/orders"
                  className="btn btn-ghost block font-semibold text-white normal-case text-left text-lg"
                >
                  Orders
                </Link>
              </div>
              {/* <ul className="menu space-y-2 mb-4">
                <li>
                  <Link href="/orders">Orders</Link>
                </li>
              </ul> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
