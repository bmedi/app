import s from './index.module.styl'
import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as configActions from '~data/actions/config'

import Button from '~co/common/button'
import links from '~config/links'
import introImage from './intro.png'

export default function PageOrganizeIntro() {
    const dispatch = useDispatch()
    const enabled = useSelector(state=>state.config.ai_organize)
    const enable = useCallback(()=>dispatch(configActions.set('ai_organize', true)), [])

    return (
        <div className={s.intro}>
            <img 
                src={introImage} 
                alt='' 
                style={{height: 173}} />

            <div className={s.headline}>
                Reduce repetive work and organize your bookmarks in a few clicks.
                Tips are grounded on your collections and tags. <a className={s.learnMore} href={links.help.organize.index} target='_blank'>Learn more</a>
            </div>

            <div className={s.sub}>You get your own private AI categorization model based on your data</div>

            {!enabled ? (<div>
                <Button variant='primary' onClick={enable}>
                    &nbsp;Enable AI Tips&nbsp;
                </Button>
            </div>) : null}
        </div>
    )
}