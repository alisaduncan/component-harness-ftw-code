import { Injectable } from '@angular/core';
import { Drama } from './models/dramas';

@Injectable({
  providedIn: 'root'
})
export class DramaService {
  private DRAMAS =  [
    {
      id: 101,
      name: 'Crash Landing on You',
      image: 'https://upload.wikimedia.org/wikipedia/en/6/64/Crash_Landing_on_You_main_poster.jpg',
      description: 'A wealthy South Korean CEO crash lands in North Korea after a paragliding mishap, and into the life of an army officer who vows to help her get back.',
      tags: ['Romantic', 'Heartfelt'],
      videoId: 'GVQGWgeVc4k',
      cast: ['Hyun Bin', 'Son Ye-jin', 'Seo Ji-hye', 'Kim Jung-hyun'],
      release: '2019',
      rating: 5,
      comments: [
        '💖💖💖💖💖',
        '💞💞💞',
        '💟',
      ]
    },
    {
      id: 167,
      name: 'Hospital Playlist',
      image: 'https://upload.wikimedia.org/wikipedia/en/e/e8/Hospital_Playlist.jpg?20210526040743',
      description: 'Five doctors who became friends in med school share friendship, laughter, and a love of music while working at the same hospital.',
      tags: ['Charming', 'Feelgood'],
      videoId: 'QdqdgF7Z5gs',
      cast:['Jo Jung-suk', 'Yoo Yeon-seok', 'Jung Kyung-ho', 'Kim Dae-myung', 'Jeon Mi-do'],
      release: '2020',
      rating: 5,
      comments: [
        'Can\'t wait for Hospital Playlist 2!'
      ]
    },
    {
      id: 204,
      name: 'Reply 1988',
      image: 'https://upload.wikimedia.org/wikipedia/en/d/d8/TVN%27s_Reply_1988_%28%EC%9D%91%EB%8B%B5%ED%95%98%EB%9D%BC_1988%29_poster.jpg',
      description: 'A nostalgic look at the camaraderie, trials, and tribulations of five families living on the same street in 1988.',
      tags: ['Charming', 'Nostalgic'],
      videoId: 'c-EMf3JdxUA',
      cast: ['Lee Hye-ri', 'Ryu Jun-yeol', 'Go Kyung-pyo', 'Park Bo-gum', 'Lee Dong-hwi'],
      release: '2015',
      rating: 5,
      comments: [
        'Reply 1988 is the best of the Reply series!',
      ]
    }
  ];

  constructor() { }

  public getDramas(): Drama[] {
    return this.DRAMAS;
  }

  public getDrama(id: number): Drama|undefined {
    return this.DRAMAS.find(d => d.id === id);
  }

  public addDramaComment(id: number, comment: string) {
    this.DRAMAS.find(d => d.id === id)?.comments.push(comment);
  }
}

