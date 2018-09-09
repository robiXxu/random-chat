import * as React from 'react';

class Room extends React.Component {
  render() {
    return (
      <div>
        Room { JSON.stringify(this.props) }
      </div>
    )
  }
};

export default Room;