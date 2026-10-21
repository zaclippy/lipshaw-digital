export default function GeoHunterStats() {
  return (
    <dl className="ld-geohunter-stats">
      {[
        ["150,000", "App downloads"],
        ["1M+", "Web players"],
        ["4.9★", "App Store rating"],
        ["#27", "App Store trivia"],
        ["3,000", "New players a day"],
        ["700", "Monthly subscribers"],
      ].map(([value, label]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
