import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState
} from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

import type { AdminProfile, NavItem } from "../domain/forestince";
import { services } from "./service-registry";
import { mockDb } from "../shared/lib/mock-db";
import { Icon } from "../shared/lib/icons";
import { Button } from "../shared/ui/button";
import { DevelopmentModal } from "../shared/ui/development-modal";

interface ShellSearchContextValue {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const SearchContext = createContext<ShellSearchContextValue | null>(null);

const primaryNav: NavItem[] = [
  { key: "dashboard", label: "Dashboard", mobileLabel: "Dashboard", href: "/", icon: "dashboard" },
  { key: "facilities", label: "Facilities", mobileLabel: "Facilities", href: "/facilities", icon: "map" },
  { key: "requests", label: "Requests", mobileLabel: "Requests", href: "/requests", icon: "pending" },
  { key: "reports", label: "Reports", mobileLabel: "Reports", href: "/reports", icon: "reports" }
];

const secondaryNav: NavItem[] = [
  { key: "booking-rules", label: "Booking Rules", icon: "rule", disabled: true },
  { key: "geoson", label: "GeoSON Layers", icon: "layers", disabled: true },
  { key: "users", label: "Users", icon: "users", disabled: true }
];

function SidebarLink({ item }: { item: NavItem }) {
  if (!item.href) {
    return (
      <div className="nav-item nav-item--disabled">
        <span className="nav-item__icon">
          <Icon height={18} name={item.icon} width={18} />
        </span>
        <span>{item.label}</span>
        <small>Soon</small>
      </div>
    );
  }

  return (
    <NavLink
      className={({ isActive }) =>
        ["nav-item", isActive ? "nav-item--active" : ""].filter(Boolean).join(" ")
      }
      to={item.href}
    >
      <span className="nav-item__icon">
        <Icon height={18} name={item.icon} width={18} />
      </span>
      <span>{item.label}</span>
    </NavLink>
  );
}

export function useShellSearch() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useShellSearch must be used within AppShell");
  }

  return context;
}

export function AppShell() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [notifications, setNotifications] = useState(0);
  const [isDevelopmentModalOpen, setIsDevelopmentModalOpen] = useState(false);

  useEffect(() => {
    const snapshot = mockDb.getState();
    setProfile(snapshot.currentAdmin);
    setNotifications(snapshot.notifications);
  }, [location.pathname]);

  useEffect(() => {
    startTransition(() => {
      setSearchQuery("");
      setMenuOpen(false);
      setIsDevelopmentModalOpen(false);
    });
  }, [location.pathname]);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      <div className="shell">
        <aside className={["sidebar", menuOpen ? "sidebar--open" : ""].join(" ")}>
          <div className="sidebar__header">
            <div className="brand">
              <div className="brand__mark">
                <Icon height={20} name="leaf" width={20} />
              </div>
              <div>
                <strong>Forestince</strong>
                <span>Nature Campus Admin</span>
              </div>
            </div>
            <button
              aria-label="Close navigation"
              className="icon-button sidebar__close mobile-only"
              onClick={() => setMenuOpen(false)}
              type="button"
            >
              X
            </button>
          </div>

          <div className="sidebar__body">
            <nav className="nav-section">
              {primaryNav.map((item) => (
                <SidebarLink item={item} key={item.key} />
              ))}
            </nav>

            <nav className="nav-section nav-section--secondary">
              {secondaryNav.map((item) => (
                <SidebarLink item={item} key={item.key} />
              ))}
            </nav>
          </div>

          <div className="sidebar__footer">
            <Button
              onClick={() => {
                services.resetDemo();
                const snapshot = mockDb.getState();
                setProfile(snapshot.currentAdmin);
                setNotifications(snapshot.notifications);
              }}
              variant="secondary"
            >
              Reset Demo Data
            </Button>
            <button
              className="nav-item nav-item--footer"
              onClick={() => setIsDevelopmentModalOpen(true)}
              type="button"
            >
              <span className="nav-item__icon">
                <Icon height={18} name="settings" width={18} />
              </span>
              <span>Settings</span>
            </button>
          </div>
        </aside>

        <div className="main-area">
          <header className="topbar">
            <button
              aria-label="Open navigation"
              className="icon-button mobile-only"
              onClick={() => setMenuOpen((value) => !value)}
              type="button"
            >
              <Icon height={22} name="menu" width={22} />
            </button>

            <label className="searchbar">
              <Icon height={18} name="search" width={18} />
              <input
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search facilities, users, or bookings..."
                value={searchQuery}
              />
            </label>

            <div className="topbar__actions">
              <Button href="/reports" variant="secondary">
                View Reports
              </Button>
              <button
                aria-label="Notifications"
                className="icon-button"
                onClick={() => setIsDevelopmentModalOpen(true)}
                type="button"
              >
                <Icon height={20} name="bell" width={20} />
                {notifications ? <span className="notification-badge">{notifications}</span> : null}
              </button>
              {profile ? (
                <div className="profile-chip">
                  <div>
                    <strong>{profile.name}</strong>
                    <span>{profile.role}</span>
                  </div>
                  <div className="profile-avatar">{profile.initials}</div>
                </div>
              ) : null}
            </div>
          </header>

          <main className="page-content">
            <Outlet />
          </main>
        </div>

        <nav className="mobile-nav">
          {primaryNav.map((item) => (
            <NavLink
              className={({ isActive }) =>
                ["mobile-nav__item", isActive ? "mobile-nav__item--active" : ""]
                  .filter(Boolean)
                  .join(" ")
              }
              key={item.key}
              to={item.href ?? "/"}
            >
              <Icon height={18} name={item.icon} width={18} />
              <span>{item.mobileLabel ?? item.label}</span>
            </NavLink>
          ))}
        </nav>

        <DevelopmentModal
          onClose={() => setIsDevelopmentModalOpen(false)}
          open={isDevelopmentModalOpen}
        />
      </div>
    </SearchContext.Provider>
  );
}
