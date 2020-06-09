import React from 'react'
import t from '~t'
import { ShortDate } from '~modules/format/date'

import SuperLink from '~co/common/superLink'
import Icon from '~co/common/icon'
import SafeHtml from '~co/common/safeHtml'
import Cover from './cover'
import Tags from './tags'
import Path from './path'

export default class BookmarkItemView extends React.PureComponent {
    render() {
        const { innerRef, isDragging } = this.props
        const { link, title, excerpt, highlight, cover, domain, tags, type, view, access, created, reparse, collectionId, spaceId } = this.props
        const { active, selected, selectDisabled, important, broken, gridSize } = this.props
        const { onClick, onTagClick, onEditClick, onPreviewClick, onSelectClick, onRemoveClick, onContextMenu, onKeyUp } = this.props

        return (
            <article 
                ref={innerRef}
                className={`element ${active&&'active'} ${selected&&'checked'} ${important&&'important'} ${broken&&'broken'} ${isDragging&&'is-dragging'}`}>
                <Cover
                    src={cover}
                    link={link}
                    view={view}
                    gridSize={gridSize} />

                <div className='about'>
                    {/* Text */}
                    <SafeHtml tagName='span' className='title'>{highlight.title || title}</SafeHtml>
                    <div>
                        <SafeHtml tagName='p' className='description'>{highlight.excerpt || excerpt}</SafeHtml>
                        {highlight.body ? <SafeHtml tagName='p' className='description from-body'>{highlight.body}</SafeHtml> : null}
                    </div>

                    {/* Tags */}
                    <Tags 
                        tags={tags}
                        onTagClick={onTagClick} />

                    {/* Info */}
                    <div className='info-wrap'>
                        <div className='info info-domain'>
                            {spaceId != collectionId ? <Path collectionId={collectionId} /> : null}

                            {important ? (
                                <div className='info-important'>
                                    <span className='info-img'>
                                        <Icon name='important' size='micro' />
                                    </span>
                                </div>
                            ) : null}

                            {reparse ? (
                                <div className='info-important'>
                                    <span className='info-img'>
                                        <Icon name='progress' size='micro' />
                                    </span>
                                </div>
                            ) : null}

                            {type != 'link' ? (
                                <div className='info-important'>
                                    <span className='info-img'>
                                        <Icon name={type} size='micro' />
                                    </span>
                                </div>
                            ) : null}

                            <div className='info-domain'>
                                {domain}&nbsp; ·&nbsp; <ShortDate date={created}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='actions'>
                    <a 
                        onClick={onPreviewClick}
                        tabIndex='-1'
                        className='button min default'
                        title={t.s('preview')}>
                        <b><Icon name='show' /></b>
                    </a>

                    {access.level >= 3 ? (
                        <>
                            <span 
                                className='button min default'
                                onClick={onEditClick}>
                                <b><Icon name='edit' /></b>
                            </span>

                            {/*<span
                                className='button min default'
                                onClick={onContextMenu}
                                title={t.s('helpContextD')}>
                                <b><Icon name='more_horizontal' /></b>
                            </span>*/}

                            <span 
                                className='button min default'
                                onClick={onRemoveClick}>
                                <b><Icon name='trash' /></b>
                            </span>
                        </>
                    ) : null}
                </div>

                {access.level >= 3 ? (
                    <label
                        className={`selectElement ${selected ? 'active' : 'default'}`}
                        title={t.s('select')}>
                        <input type='checkbox' checked={selected} disabled={selectDisabled} onChange={onSelectClick} />
                    </label>
                ) : null}

                <SuperLink
					navPrefix='element'
                    href={link}
                    tabIndex={active ? '200' : '-1'}
					onClick={onClick}
                    onContextMenu={onContextMenu}
                    onKeyUp={onKeyUp}
					className='permalink' />
            </article>
        )
    }
}