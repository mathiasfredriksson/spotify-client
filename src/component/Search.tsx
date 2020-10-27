import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/ClearSharp';
import SearchIcon from '@material-ui/icons/SearchSharp';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles(theme => {

	return {
		root: {
			flex: 1,
			display: 'flex',
			backgroundColor: 'transparent'
		},
		input: {
			flex: 1
		}
	}
});

const BootstrapInput = withStyles(theme => ({
	input: {
		borderRadius: 5,
		fontSize: 12,
		flex: 1,
		padding: '5px 10px'
	}
}))(InputBase);

interface SearchProps {
	id: string | undefined,
	onChange: Function | undefined,
	onSubmit: Function | undefined
}

const SearchComponent = (props:SearchProps) =>  {

	const classes = useStyles();
	const [ value, setValue ] = React.useState('');

	const onChange = (event:any) => {

        event.preventDefault();

        const { value } = event.target;

        setValue(value);

		if (props.onChange) {

			props.onChange(value);
		}
    }

	const onKeyPress = (event:any) => {

		if (event.key === 'Enter') {

			submit()
			event.preventDefault();
		}
	}

	const submit = () => {

		setValue('');

		if (props.onSubmit) {

			props.onSubmit(value);
		}
	}

	const clear = () => {

		setValue('');

		if (props.onChange) {

			props.onChange('');
		}

		if (props.onSubmit) {

			props.onSubmit('');
		}
	}

	const { id = 'input' } = props;

	const searchIcon = props.onSubmit ?
		<IconButton
			size='small'
			onClick={ submit }>
			<SearchIcon />
		</IconButton>:
		'';

	return (
		<Paper component="form" className={ classes.root } id={ id }>
			<BootstrapInput
				className={ classes.input }
				placeholder="Search..."
				autoComplete='off'
				onChange={ onChange }
				autoFocus={ false }
				onKeyPress={ onKeyPress }
				value={ value }
			/>
			<IconButton
				size='small'
				onClick={ clear }>
				<ClearIcon />
			</IconButton>
			{ searchIcon }
		</Paper>
	);
}

export default SearchComponent
