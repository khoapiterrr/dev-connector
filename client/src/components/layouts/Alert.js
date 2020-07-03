import React from 'react';
import { useSelector } from 'react-redux';

const Alert = () => {
  const alerts = useSelector((e) => e.alerts);
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ))
  );
};

// const mapStateToProps = (state) => ({
//   alerts: state.alerts,
// });

// export default connect(mapStateToProps)(Alert);
export default Alert;
