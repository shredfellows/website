import Enzyme, {shallow, render, mount} from 'enzyme';
import Adaptor from 'enzyme-adaptor-react-16';
Enzyme.configure({adapter: new Adapter()});

global.shallow = shallow;
global.render = render;
global.mount = mount;