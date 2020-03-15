import React, {useState} from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import cx from 'classnames';

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState('1');

  return (
    <div className="product-info-tabs">
      <Nav tabs>
        <NavItem>
          <NavLink
            tabIndex="0"
            className={cx({ active: activeTab === '1' })}
            onClick={() => { setActiveTab('1'); }}
          >
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tabIndex="0"
            className={cx({ active: activeTab === '2' })}
            onClick={() => { setActiveTab('2'); }}
          >
            Profile
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tabIndex="0"
            className={cx({ active: activeTab === '3' })}
            onClick={() => { setActiveTab('3'); }}
          >
            Contact
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <p>
            The EOS 200D is a great choice for landscapes, portraits and travel and captures great quality photos and
            movies with a next-generation 24.2-megapixel image sensor. It’s connected too, designed to work with
            smartphones and tablet computers² so you can share your photos and movies with friends, and control your
            camera remotely. Also known by customers as: Canon 200D, 200D
          </p>
          <h5 className="h6">Benefits</h5>
          <ul className="pl-4">
            <li>An ultra-compact DSLR camera that’s easy to use and delivers superb results</li>
            <li>A great camera for landscapes, portraits and travel. Capture intricate detail with a 24.2-megapixel
              sensor
            </li>
            <li>Images are sharp and clear, thanks to autofocus that’s accurate even in low light</li>
            <li>Enjoy a responsive performance, whether you’re composing with Live View or using the high-quality
              optical viewfinder
            </li>
            <li>Focus confidently with the world’s fastest Live View focusing³</li>
            <li>Low Energy Bluetooth® maintains a connection with your smart device without excessive battery drain</li>
            <li>Share images from your smart device and control your camera remotely, using Bluetooth® and Wi-Fi²</li>
            <li>Shoot superb Full HD video that looks amazing online and on your home TV</li>
            <li>Part of the EOS family: a system of lenses and accessories that empowers you to be creative</li>
            <li>Comes with the free Canon Photo Companion app. Enjoy personalised content, challenges and inspiration to
              guide you along your photography journey, the perfect partner for any visual storyteller.
            </li>
            <li>Comes with the free Canon Camera Connect app. Connect your camera to your Apple or Android device for
              remote shooting and to easily download your photos, ready for sharing.
            </li>
          </ul>
        </TabPane>
        <TabPane tabId="2">
          Et et consectetur ipsum labore excepteur est proident excepteur ad velit occaecat qui minim occaecat veniam.
          Fugiat veniam incididunt anim aliqua enim pariatur veniam sunt est aute sit dolor anim. Velit non irure adipisicing aliqua ullamco irure incididunt irure non esse
          consectetur nostrud minim non minim occaecat. Amet duis do nisi duis veniam non est eiusmod tempor incididunt tempor dolor ipsum in qui sit.
          Exercitation mollit sit culpa nisi culpa non adipisicing reprehenderit do dolore. Duis reprehenderit occaecat anim ullamco ad duis occaecat ex.
        </TabPane>
        <TabPane tabId="3">
          Et et consectetur ipsum labore excepteur est proident excepteur ad velit occaecat qui minim occaecat veniam.
          Fugiat veniam incididunt anim aliqua enim pariatur veniam sunt est aute sit dolor anim. Velit non irure adipisicing aliqua ullamco irure incididunt irure non esse
          consectetur nostrud minim non minim occaecat. Amet duis do nisi duis veniam non est eiusmod tempor incididunt tempor dolor ipsum in qui sit.
          Exercitation mollit sit culpa nisi culpa non adipisicing reprehenderit do dolore. Duis reprehenderit occaecat anim ullamco ad duis occaecat ex.
        </TabPane>
      </TabContent>
    </div>
  );
};

export default ProductTabs;