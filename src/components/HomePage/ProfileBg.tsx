import { Animator } from '@arwes/react';
import { Puffs, Dots, MovingLines } from '@arwes/react-bgs'

const ProfileBg: React.FC<{ showDetails: boolean }> = ({ showDetails }) => {
  return (
    <Animator active={showDetails} duration={{ enter: 1, exit: 1 }}>
        <div
            style={{
                position: 'absolute',
                inset: 0,
                color: '#4e9eff',
                opacity: 0.3,
            }}
        >
            <Puffs color={'#4e9eff'} quantity={40} />
            <Dots color={'#4e9eff'} size={3} distance={50} />
            <MovingLines lineColor='#4e9eff' lineWidth={3} distance={50}/>
        </div>
    </Animator>
  );
};

export default ProfileBg;