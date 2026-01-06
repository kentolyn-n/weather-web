export default function Sunny() {
  return (
    <div className="fixed inset-0 -z-10">   
        <img
        src="https://images.unsplash.com/photo-1502082553048-f009c37129b9"
        alt="Sunny sky"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-yellow-200/20" />

      <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-400 rounded-full blur-xl animate-spin-slow" />

    </div>
  );
}
