import React from 'react';

export default function StatCard({ title, count, type, icon: Icon, subtext }) {
  return (
    <div className={`stat-card ${type}`}>
      <div className="stat-info">
        <span className="stat-label">{title}</span>
        <span className="stat-value">{count}</span>
        {subtext && <span className="stat-subtext">{subtext}</span>}
      </div>
      <div className="stat-icon-wrapper">
        {Icon ? <Icon size={26} /> : null}
      </div>
    </div>
  );
}
