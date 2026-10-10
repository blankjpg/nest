import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-navy-900">
      {/* Top Navigation */}
      <nav className="bg-navy-800 border-b border-navy-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold text-accent-400">Own What You Spend</h1>

              <div className="hidden sm:flex gap-1">
                <NavItem to="/">Dashboard</NavItem>
                <NavItem to="/summary">Monthly Summary</NavItem>
                <NavItem to="/portfolio">Portfolio</NavItem>
                <NavItem to="/settings">Settings</NavItem>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="sm:hidden flex gap-1 pb-2 overflow-x-auto">
            <NavItem to="/">Dashboard</NavItem>
            <NavItem to="/summary">Summary</NavItem>
            <NavItem to="/portfolio">Portfolio</NavItem>
            <NavItem to="/settings">Settings</NavItem>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}

function NavItem({ to, children }: { to: string; children: ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
          isActive
            ? 'bg-accent-600 text-white'
            : 'text-gray-300 hover:bg-navy-700 hover:text-white'
        }`
      }
    >
      {children}
    </NavLink>
  );
}
