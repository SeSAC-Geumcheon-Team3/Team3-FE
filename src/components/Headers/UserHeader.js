// reactstrap components

const UserHeader = () => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "100px",
          backgroundColor: "#1a237e", // 어두운 남색 배경으로 설정
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
      </div>
    </>
  );
};

export default UserHeader;
