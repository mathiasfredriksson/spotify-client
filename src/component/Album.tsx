import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import List from './List';
import { IAlbum, ITrack } from './Interface';

const style = ({ palette, spacing }: Theme) => createStyles({
	root: {
		display: 'flex',
		flexDirection: 'column'
	}
});

interface QueryData {
	queryTracks: [ITrack]
}

interface QueryVars {}

interface AlbumProps {
	album: IAlbum | undefined,
	classes: any
}

const QUERY = gql`
	query Tracks($id: String!) {
		queryTracks(id: $id) {
			id,
			name
		}
	}
`;

const Album = (props:AlbumProps) => {

	const { classes } = props;

	const { loading, data } = useQuery<QueryData, QueryVars>(
		QUERY,
		{ variables: {
			id: props.album ? props.album.id : ''
		} }
	);

	const items:Array<any> = [];

	if (data) {

		for (let track of data.queryTracks) {

			items.push({ key: track.id, title: track.name });
		}
	}

	return (
		<div className={ classes.root }>
			{ props.album ? props.album.name : '' }
			{ loading ? (
				<p>Loading..</p>
			) : (
				<List items={ items } title='Tracks' onClick={ () => {} } />
			)}
		</div>
	);
}

export default withStyles(style)(Album);
