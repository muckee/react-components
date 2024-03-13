import React from 'react';
import RemixIcon, {
    Logos,
    RemixIconSize,
} from '@components/RemixIcon';
import { ListItem, UnorderedList } from '@components/List';
import styles from './Socials.module.css';

const getSocialIcon = (name: string, size: string) => {

    switch (name.toLowerCase()) {
    case 'squatjuice':
        return <img
            src='./icons/squatjuice_favicon.ico'
            title='SquatJuice'
            alt='SquatJuice Logo'
        />;
    case 'mixcloud':
        return <img
            src='./icons/mixcloud_logo_mark.svg'
            title='MixCloud'
            alt='MixCloud Logo'
        />;
    case 'discord':
        return <RemixIcon
            icon={Logos.DiscordLine}
            title='Discord'
            size={size as RemixIconSize}
        />;
    case 'spotify':
        return <RemixIcon
            icon={Logos.SpotifyLine}
            title='Spotify'
            size={size as RemixIconSize}
        />;
    case 'soundcloud':
        return <RemixIcon
            icon={Logos.SoundcloudLine}
            title='SoundCloud'
            size={size as RemixIconSize}
        />;
    case 'facebook':
        return <RemixIcon
            icon={Logos.FacebookCircleLine}
            title='Facebook'
            size={size as RemixIconSize}
        />;
    case 'instagram':
        return <RemixIcon
            icon={Logos.InstagramLine}
            title='Instagram'
            size={size as RemixIconSize}
        />;
    case 'twitter':
    case 'x':
        return <RemixIcon
            icon={Logos.TwitterLine}
            title='X'
            size={size as RemixIconSize}
        />;
    default:
        return name;
    }
};

export interface SocialsProps {
    size: string,
    socials: {
        url: string,
        name: string,
    }[],
    className: string,
}

const Socials = (props: SocialsProps) => {

    const {
        size,
        socials,
        className,
    } = props;

    const availableSocials = socials.filter(social => social.url);

    if (!availableSocials.length) {

        return;
    }

    return <UnorderedList
        className={`${styles.list}${className ? ` ${className}` : ''}`}
    >

        {availableSocials.map((social, idx) => {

            return <ListItem
                key={idx}
            >

                <a
                    href={social.url}
                    target='_blank'
                    rel='noreferrer'
                >{getSocialIcon(social.name, size)}</a>

            </ListItem>;
        })}

    </UnorderedList>;
};

export default Socials;