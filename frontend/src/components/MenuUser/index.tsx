import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CgChevronDown, CgChevronUp, CgHeart, CgLoadbarDoc, CgProfile, CgSmile } from 'react-icons/cg';
import { MenuContainer, OpenMenu } from './styles';

interface MenuProps {
  name?: string;
  id?: string;
}




const MenuUser = ({ name, id } : MenuProps) => {
    const [mobile, setMobile] = useState<boolean>(false)

    useEffect(() => {
    
      if(window.innerWidth <= 768) {
        setMobile(true);
      } 
    
    },[])


    const openMenu = () => {
      setMobile(!mobile)
    }
  
  return (

   <> 
  <MenuContainer height={mobile && 70}>
    <div className="welcome">
      Olá, <strong>{name} </strong> ! <br /> seja bem vindo.
    </div>
    <nav>
      <ul>
          <li>
          <Link href={`/user/${id}`}>
            <a>
              <CgSmile size={22} /> Minha Area
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/user/profile/${id}`}>
            <a>
              <CgProfile size={22} /> Editar Perfil
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/candidate/profile/${id}`}>
            <a>
              <CgLoadbarDoc size={22} />
              Editar Curriculum
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/candidate/profile/${id}`}>
            <a>
              <CgHeart size={22} /> Historico de Aplicações
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  </MenuContainer>

    <OpenMenu onClick={openMenu}>
        {mobile ? <CgChevronDown size={22}/> : <CgChevronUp size={22}/>}
    </OpenMenu>
  </>
);
  }
export default MenuUser;
