export const BuySellButton = ({ setActionType, setIsOpen }) => {
  return (
    <div className="d-flex justify-content-between my-3">
      <button
        className="btn btn-success w-100 text-white mb-3 me-2"
        onClick={() => {
          setActionType("b");
          setIsOpen(true);
        }}
      >
        Beli saham +
      </button>
      <button
        className="btn btn-danger w-100 text-white mb-3 ms-2"
        onClick={() => {
          setActionType("s");
          setIsOpen(true);
        }}
      >
        Jual saham -
      </button>
    </div>
  );
};
