import React from 'react';

function Header() {
  return (
    <header style={styles.header}>
      <h2 style={styles.title}>丽江古城城市应急广播综合指挥平台</h2>
    </header>
  )
}
const styles = {
  header: {
    height: 130,
    textAlign: 'center'
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold'
  }
}
export default Header;