function Footer() {
  return (
    <footer className="border-t bg-gray-900">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-center px-4 py-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-gray-300 sm:text-base">
          © {new Date().getFullYear()} StreamForge. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
