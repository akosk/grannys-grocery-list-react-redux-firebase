import {expect} from 'chai';
import deepFreeze  from 'deep-freeze';
import * as actionCreators from '../app/actions/action_creators';
import reducers from '../app/reducers';

describe('Auth reducer', ()=> {

  it('handles OPEN_LOGIN_POPUP', ()=> {
    const initialState = {
      auth: {
        something: "anything"
      }
    };
    deepFreeze(initialState);

    const action = actionCreators.openLoginPopup();
    deepFreeze(action);

    const nextState = reducers(initialState, action);

    expect(nextState.auth).to.deep.equal({
      something: "anything",
      popupOpened: true
    });

  });

  it('handles LOGIN_ERROR', ()=> {
    const initialState = {
      auth: {
        popupOpened: true
      }
    };
    deepFreeze(initialState);

    const action = actionCreators.loginError({
      code: 'INVALID_CREDENTIALS'
    });
    deepFreeze(action);

    const nextState = reducers(initialState, action);

    expect(nextState.auth).to.deep.equal({
      popupOpened: false,
      error: {
        code: 'INVALID_CREDENTIALS'
      }
    });
  });

  it('handles LOGIN_SUCCEED', ()=> {
    const initialState = {
      auth: {
        popupOpened: true
      }
    };
    deepFreeze(initialState);

    const action = actionCreators.loginSucceed(
      {
        provider: "facebook",
        uid: "facebook:43243243243244234",
        facebook: {
          id: "54354354354354355",
          accessToken: "gdfgfdgdfgdfgdfgdfgdfgdfgdfgdfggdfggdfgfdgfdgdfgdfgdfggdfggggggggggggggggggggggggggfdsfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdsdfsdfsdfsdfsdfsdfsdfffsdfsdfsdfsfsdfsdfdsloQgfdgfdgfdgfdgfdgfdgfdgdfgdfgdfgdfgg",
          displayName: "AAAA BBBBBBB",
          cachedUserProfile: {
            id: "32432432432432444",
            name: "AAAA BBBBB",
            last_name: "BBBBB",
            first_name: "AAAAA",
            gender: "male",
            link: "https://www.facebook.com/app_scoped_user_id/43243243243243244/",
            picture: {
              data: {
                is_silhouette: false,
                url: "https://scontent.xx.fbcdn.net/hprofile-xpf1/v/t1.0-1/s100x100/319560_10150365035366369_6559153_n.jpg?oh=92f029dcfb72cdfebe9cd3e0734f0aca&oe=57BD8A22"
              }
            },
            age_range: {
              min: 21
            },
            locale: "en_GB",
            timezone: 2
          },
          profileImageURL: "https://scontent.xx.fbcdn.net/hprofile-xpf1/v/t1.0-1/s100x100/319560_10150365035366369_6559153_n.jpg?oh=92f029dcfb72cdfebe9cd3e0734f0aca&oe=57BD8A22"
        },
        token: "erewrewrewrwewrwerewr43243243243243432434tretertretretretretretr",
        auth: {
          uid: "facebook:43243243243243243",
          provider: "facebook"
        },
        expires: 1111111111
      });
    deepFreeze(action);

    const nextState = reducers(initialState, action);

    expect(nextState.auth).to.deep.equal({
      user:{
        ...action.user
      },
      popupOpened: false,

    });
  });

});
