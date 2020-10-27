import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import List from './List';
import SearchComponent from './Search';
import Artist from './Artist';
import { IAlbum } from './Interface';
import { getUser } from './../query/Spotify';

const style = ({ palette, spacing }: Theme) => createStyles({
	root: {
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'row'
	},
	search: {
		height: '100%'
	}
});

interface QueryData {
	queryArtists: [IAlbum]
}

interface QueryVars {}

interface SpotifyProps {
	classes: any
}

const QUERY = gql`
	query Artists($byName: String!) {
		queryArtists(byName: $byName) {
			id,
			name
		}
	}
`;

interface SpotifyUserProps {}

interface ProfileImage {
	url: string
}

const SpotifyUser = (props:SpotifyUserProps) => {

	const [data, setData] = useState({ images:Array<ProfileImage>() });

	useEffect(() => {

		const fetchData = async () => {

			const user = await getUser();

			setData(user);

		};

		fetchData();

	}, []);

	let imageElement = <img
		alt='user_profile'
		id="source"
		width='80'
		height='80' />;

	if (data && data.images) {

		const { images } = data;
		const profileImage = images[0];

		if (profileImage) {

			imageElement = <img
				alt='user_profile'
				id="source"
				width='80'
				height='80'
				src={ profileImage.url } />;
		}
	}

	return <div>
		{ imageElement }
	</div>
}

const Spotify = (props:SpotifyProps) => {

	const { classes } = props;
	const [searchString, setSearchString] = React.useState('');
	const [artist, setArtist] = React.useState(undefined);
	const { loading, data } = useQuery<QueryData, QueryVars>(
		QUERY,
		{ variables: {
			byName: searchString
		} }
	);

	let searchElement;

	if (searchString) {

		const items:Array<any> = [];

		if (data) {

			for (let artist of data.queryArtists) {

				items.push({ key: artist.id, title: artist.name, ...artist });
			}
		}

		searchElement = loading ?
			<p>Loading..</p>:
			<List
				items={ items }
				title='Artists'
				onClick={ (artist:any) => {

					setArtist(artist);

				} } />
	}

	const searchProps = {
		onChange: (value:string) => {
			setSearchString(value)
		},
		onSubmit: () => {},
		id: ''
	}

	const artistElement = artist ? <Artist artist={ artist } /> : '';

	return (
		<div className={ classes.root }>
			<div className={ classes.search }>
				<SpotifyUser />
				<SearchComponent { ...searchProps } />
				{ searchElement }
			</div>
			{ artistElement }
		</div>
	);
}

export default withStyles(style)(Spotify);
