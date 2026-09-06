import { Bell, Menu, Search, Upload } from "lucide-react";

import { Container } from "../index";
import { Link } from "react-router-dom";
import AccountDropdown from "./Dropdown";

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gray-900 backdrop-blur-md text-gray-400">
      <Container>
        <div className="flex h-16 items-center gap-2 sm:gap-4">
          {/* Menu + Logo */}

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <button
              type="button"
              className="rounded-full p-2 transition hover:bg-gray-600"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            <Link to="/" className="text-lg font-bold text-gray-100">
              StreamForge
            </Link>
          </div>

          {/* Search */}

          <div className="flex min-w-0 flex-10 md:mx-auto md:max-w-2xl">
            <form className="flex w-full overflow-hidden rounded-full border border-gray-300">
              <input
                type="search"
                placeholder="Search"
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none sm:px-5 sm:py-2.5"
                aria-label="Search"
              />

              <button
                type="submit"
                className="flex w-9 shrink-0 items-center justify-center border-l border-gray-300 bg-gray-600 transition hover:bg-gray-500 sm:w-14"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* Actions */}

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              className="hidden rounded-full p-2 transition hover:bg-gray-600 sm:block"
              aria-label="Upload video"
            >
              <Upload size={22} />
            </button>

            <button
              type="button"
              className="hidden rounded-full p-2 transition hover:bg-gray-600 sm:block"
              aria-label="Notifications"
            >
              <Bell size={22} />
            </button>

            {/* Account Dropdown */}

            <AccountDropdown />
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
