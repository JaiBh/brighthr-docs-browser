import ModeToggle from "./ModeToggle";

function Header() {
  return (
    <div className="section-center mt-5 flex items-center justify-between">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Documents</h1>
        <p className="text-muted-foreground">View and manage uploaded files</p>
      </div>
      <ModeToggle></ModeToggle>
    </div>
  );
}
export default Header;
