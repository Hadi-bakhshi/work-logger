import "./NyxAgGridSkeleton.scss";

interface NyxAgGridSkeletonProps {
  theme?: "light" | "dark";
}

const NyxAgGridSkeleton = ({ theme = "light" }: NyxAgGridSkeletonProps) => {
  const skelton = new Array(30).fill("");

  const classes =
    theme === "light" ? "skeleton-item-light" : "skeleton-item-dark";
  return (
    <>
      <div className="skeleton-loading">
        <div className="skelton-header">
          <div className={`${classes} short`}></div>
          <div className={`${classes} short`}></div>
        </div>
        <div className={classes} style={{ height: "60px" }}></div>
        {skelton.map((_, index: number) => (
          <div key={index} className={classes}></div>
        ))}
      </div>
    </>
  );
};

export default NyxAgGridSkeleton;
