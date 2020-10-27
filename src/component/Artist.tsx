import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import List from './List';
import Album from './Album';
import { IAlbum, IArtist } from './Interface';

const style = ({ palette, spacing }: Theme) => createStyles({
	root: {
		display: 'flex'
	},
	container: {
		display: 'flex',
		flexDirection: 'column'
	}
});

interface QueryData {
	queryAlbums: [IAlbum]
}

interface QueryVars {}

interface ArtistProps {
	artist: IArtist | undefined,
	classes: any
}

const QUERY = gql`
	query Albums($artistId: String!) {
		queryAlbums(artistId: $artistId) {
			id,
			name
		}
	}
`;

const Artist = (props:ArtistProps) => {

	const { classes } = props;
	const [album, setAlbum] = React.useState(undefined);
	const { loading, data } = useQuery<QueryData, QueryVars>(
		QUERY,
		{ variables: {
			artistId: props.artist ? props.artist.id : ''
		} }
	);

	const items:Array<any> = [];

	if (data) {

		for (let album of data.queryAlbums) {

			items.push({ key: album.id, title: album.name, ...album });
		}
	}

	const albumElement = album ?
		<Album album={ album } />:
		'';

	return (
		<div className={ classes.root }>
			<div className={ classes.container }>
				{ props.artist ? props.artist.name : '' }
				{ loading ? (
					<p>Loading..</p>
				) : (
					<List items={ items } title='Albums' onClick={ (album:any) => {

						setAlbum(album);

					} } />
				)}
			</div>
			{ albumElement }
		</div>
	);
}

export default withStyles(style)(Artist);
