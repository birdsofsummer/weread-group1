import ffmpy
import subprocess



'''
https://ffmpy.readthedocs.io/en/latest/
'''
def run(inputs,outputs):
    ff = FFmpeg(
        inputs=inputs
        outputs=outputs
    )
    ff.cmd
    #'ffmpeg -i audio.mp4 -i video.mp4 -c:v h264 -c:a ac3 output.ts'
    ff.run()

def run1( f1='rawvideo', inputs={'pipe:0': '-f rawvideo -pix_fmt rgb24 -s:v 640x480'}, outputs={'pipe:1': '-c:v h264 -f mp4'}):
    ff = FFmpeg(
        inputs=inputs
        outputs=outputs
    )
    ff.cmd
    #'ffmpeg -f rawvideo -pix_fmt rgb24 -s:v 640x480 -i pipe:0 -c:v h264 -f mp4 pipe:1'
    stdout, stderr = ff.run( input_data=open(f1, 'rb').read(), , stdout=subprocess.PIPE)





def convert(f1="1.aac",f2="1.mp3"):
    inputs={f1: None},
    outputs={f2: None}

def convert1(f1="1.ts",f2="1.mp4"):
    inputs={f1: None},
    outputs={f2: '-c:a mp2 -c:v mpeg2video'}

def mix():
    inputs={'video.mp4': None, 'audio.mp3': None},
    outputs={'output.ts': '-c:v h264 -c:a ac3'}
    #'ffmpeg -i audio.mp4 -i video.mp4 -c:v h264 -c:a ac3 output.ts'

def mix1():
    from collections import OrderedDict
    inputs = OrderedDict([('video.mp4', None), ('audio_1.mp3', None), ('audio_2.mp3', None)])
    outputs = {'output.ts', '-map 0 -c:v h264 -map 1 -c:a:0 ac3 -map 2 -c:a:1 mp2'}
    #'ffmpeg -i video.mp4 -i audio_1.mp3 -i audio_2.mp3 -map 0 -c:v h264 -map 1 -c:a:0 ac3 -map 2 -c:a:1 mp2 output.ts'


def t1():
    inputs={'input.ts': None},
    outputs={
        'video.mp4': ['-map', '0:0', '-c:a', 'copy', '-f', 'mp4'],
        'audio.mp4': ['-map', '0:1', '-c:a', 'copy', '-f', 'mp4']
    }
    #'ffmpeg -i input.ts -map 0:1 -c:a copy -f mp4 audio.mp4 -map 0:0 -c:a copy -f mp4 video.mp4'

def t2():
    inputs={'input.ts': None},
    outputs={'output.ts': ['-vf', 'adif=0:-1:0, scale=iw/2:-1']}
    outputs={'output.ts': '-vf "adif=0:-1:0, scale=iw/2:-1"'}
'''
ffmpeg -i input.ts -vf "adif=0:-1:0, scale=iw/2:-1" output.ts'
ffmpeg -i input.ts -vf "adif=0:-1:0, scale=iw/2:-1" output.ts'
ffmpeg -i input.ts -vf "drawtext=fontfile=/Library/Fonts/Verdana.ttf: timecode='09\:57\:00\:00': r=25: x=(w-tw)/2: y=h-(2*lh): fontcolor=white: box=1: boxcolor=0x00000000@1" -an output.ts

'''

def t3():
    inputs={'input.ts': None},
    outputs={'output.ts': ['-vf', "drawtext=fontfile=/Library/Fonts/Verdana.ttf: timecode='09\:57\:00\:00': r=25: x=(w-tw)/2: y=h-(2*lh): fontcolor=white: box=1: boxcolor=0x00000000@1", '-an']}
    #'ffmpeg -i input.ts -vf "drawtext=fontfile=/Library/Fonts/Verdana.ttf: timecode=\'09\:57\:00\:00\': r=25: x=(w-tw)/2: y=h-(2*lh): fontcolor=white: box=1: boxcolor=0x00000000@1" -an output.ts'


def t4():
     inputs={'input.ts': None},
     outputs={'output.ts': ["-vf \"drawtext=fontfile=/Library/Fonts/Verdana.ttf: timecode='09\:57\:00\:00': r=25: x=(w-tw)/2: y=h-(2*lh): fontcolor=white: box=1: boxcolor=0x00000000@1\" -an"}
#'ffmpeg -i input.ts -vf "drawtext=fontfile=/Library/Fonts/Verdana.ttf: timecode=\'09\:57\:00\:00\': r=25: x=(w-tw)/2: y=h-(2*lh): fontcolor=white: box=1: boxcolor=0x00000000@1" -an output.ts'



