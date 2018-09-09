import * as React from 'react';
import { IRoom, IUser, IRoomInfo } from '../../types';
import { enterRoom } from '../../firebase/Firebase';

class Room extends React.Component<IRoom> {
  room: string;
  user: IUser;

  constructor(props: IRoom) {
    super(props);
    this.state = {
      data: [],
      users: {}
    }
    this.room = this.props.match.params.room;
    // testing
    this.user = {
      nickname: `robiXxu${Date.now()}`
    };
  }

  componentDidMount() {
    enterRoom(this.room, this.user).then(( roomInfo: IRoomInfo ) => {
      this.setState(() => ({
        data: roomInfo.data,
        users: roomInfo.users
      }));
    })
  }

  render() {
    return (
      <div>
        Room {this.room}
      </div>
    )
  }
  
};

export default Room;