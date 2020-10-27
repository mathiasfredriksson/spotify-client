import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	list: {
		overflowY: 'auto',
		height: '100%'
	}
}));

export interface ListProps {
	items: Array<any>,
	title: string,
	onClick: Function | undefined
}

const ListComponent = (props:ListProps) => {

	const classes = useStyles();
	const { items = [], title = '', onClick = () => {} } = props;
	const elements = [];

	for (let item of items) {

		if (item.hover) {

			elements.push(
				<ListItem className='list-item' button key={ item.key } onClick={event => {

					}}>
					<Tooltip title={ item.hover } placement="top">
						<ListItemText primary={ <Typography variant="body2">
							{ item.title }
						</Typography> } />
					</Tooltip>
				</ListItem>
			);

			continue;
		}

		elements.push(
			<ListItem className='list-item' button key={ item.key } onClick={() => {

				onClick(item);
			}}>
				<ListItemText primary={ <Typography variant="body2">
					{ item.title }
				</Typography> } />
			</ListItem>
		);
	}

	return (
		<List
			component='nav'
			subheader={
				<ListSubheader component="div">
					{ title }
				</ListSubheader>
			}
			className={ classes.list } >
			{ elements }
		</List>
	);
}

export default ListComponent;
