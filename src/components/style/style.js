export const Wrapper = {
	margin: '15px auto',
	width: 850
}

export const H1 = {
	textAlign: 'center',
	textTransform: 'uppercase',
	font: 'bold 75px/90px Arial'
}

export const H2 = {
	textAlign: 'center',
	textTransform: 'uppercase',
	font: 'bold 30px/45px Arial' 
}

export const P = {
	font: 'bold 20px/30px Arial',
	paddingLeft: 10 
}

export const Separator = {
	clear: 'both'
}

export const HoleWrapper = {
	width: 550,
	height: 360,
	border: '2px solid #000',
	borderRadius: 10,
	float: 'left',
	margin: '0 10px',
	backgroundColor: '#F6CEE3'
}

export const StartText = {
	height: '100%',
    width: '100%',
    textAlign: 'center',
    textTransform: 'uppercase',
    font: 'bold 40px/360px Arial'
}

export const EndText = {
    width: '100%',
    textAlign: 'center',
    textTransform: 'uppercase',
    font: 'bold 40px/50px Arial',
    paddingTop: 70
}

export const EndImage = {
	width: 185,
	display: 'block',
	margin: '0 auto'
}

const HoleContainer = {
	width: 150,
	height: 150,
	margin: 15,
	backgroundColor: '#E6E6E6',
	backgroundSize: 'cover',
	border: '2px solid #000',
    boxSizing: 'border-box',
    borderRadius: 10,
	float: 'left'
}

export const Hole = {
	...HoleContainer,
	backgroundImage: 'url("2.png")'
}

export const HoleClick = {
	...Hole,
	backgroundColor: '#FE2E2E'
}

export const HoleActive = {
	...HoleContainer,
	backgroundImage: 'url("1.png")'
}

export const HoleActiveClick = {
	...HoleActive,
	backgroundColor: '#58FA58'
}

export const StatusWrapper = {
	width: 250,
	height: 360,
	border: '2px solid #000',
	borderRadius: 10,
	float: 'right',
	margin: '0 10px',
	backgroundColor: '#F6CEE3'
}

export const LvlUP = {
	border: 'solid 10px #07A407',
    margin: 10,
    borderRadius: 5,
    height: 170,
    font: 'bold 40px/150px arial',
    textAlign: 'center',
    boxSizing: 'border-box',
    color: '#07A407',
    backgroundColor: '#84F284'
}