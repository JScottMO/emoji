interface CategoryChipProps {
  label: string;
  active?: boolean;
  onClick: () => void;
}

const CategoryChip = ({ label, active, onClick }: CategoryChipProps) => (
  <button
    onClick={onClick}
    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
      active
        ? "bg-primary text-primary-foreground"
        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
    }`}
  >
    {label}
  </button>
);

export default CategoryChip;
