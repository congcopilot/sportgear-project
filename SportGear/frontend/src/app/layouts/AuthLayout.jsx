function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>{title}</h1>
        {subtitle ? <p className="auth-subtitle">{subtitle}</p> : null}
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
