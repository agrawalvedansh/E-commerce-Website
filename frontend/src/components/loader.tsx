const Loader = () => {
  return (
    <div>Loading...</div>
  )
}

export const Skeleton = ({width="unset"} : {width?: string}) => {
  return <div className = "skeleton-loader" style={{width: width}}>
    <div className="skeleton-shape"></div>
    <div className="skeleton-shape"></div>
    <div className="skeleton-shape"></div>
  </div>
}

export default Loader